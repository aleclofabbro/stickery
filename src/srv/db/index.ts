import { actionCtx } from 'lib/Actions'
import { Reducer, useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { ImageMeta, ImagesDB, ImageData } from './db'

export interface ImageDBState {
  images: ImageMeta[]
}
type ImageDBReducer = Reducer<ImageDBState, any>

const cmd_int_set_DB_images = actionCtx<ImageDBState['images']>('cmd_int_set_DB_images')
const cmd_int_add_image_meta = actionCtx<ImageMeta>('cmd_int_add_image_meta')
export const cmd_import_image_file = actionCtx<File>('cmd_import_image_file')

const initState: ImageDBState = {
  images: []
}
const reducer: ImageDBReducer = (prev, action) =>
  cmd_int_set_DB_images.do(action, (images) => ({
    ...prev,
    images
  })) ||
  cmd_int_add_image_meta.do(action, (meta) => ({
    ...prev,
    images: [meta, ...prev.images]
  })) ||
  prev

export const useImageDb = () => {
  const { current: imagesDB } = useRef(new ImagesDB())
  const [state, _dispatch] = useReducer<ImageDBReducer>(reducer, initState)

  const dispatch = useCallback<typeof _dispatch>(
    (action) => {
      cmd_import_image_file.do(action, (file) =>
        importImageInDB(imagesDB, file).then(cmd_int_add_image_meta(_dispatch))
      )
      _dispatch(action)
    },
    [imagesDB]
  )

  useEffect(() => {
    imagesDB.imageMeta.toArray().then(cmd_int_set_DB_images(dispatch))
  }, [dispatch, imagesDB.imageMeta])

  return useMemo(() => {
    return {
      state,
      dispatch
    }
  }, [dispatch, state])
}

export const importImageInDB = async (imagesDB: ImagesDB, file: File): Promise<ImageMeta> => {
  const { name, size, lastModified, type } = file
  const src = createImageSrcUrl(name)
  const id = src
  // @ts-ignore
  const blob: Blob = await file.arrayBuffer()

  const imgData: ImageData = {
    blob,
    id
  }
  await imagesDB.imageData.add(imgData)
  const imgMeta: ImageMeta = {
    size,
    lastModified,
    name,
    type,
    id
  }
  await imagesDB.imageMeta.add(imgMeta)
  return imgMeta
}

export const createId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9)

export const getImageSrcUrl = (name: string, id: string) => `/_/images/${id}/${name}`
export const createImageSrcUrl = (name: string) => getImageSrcUrl(name, createId())

import { actionCtx } from 'lib/reducer/Actions'
import { Reducer, useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { ImageMeta, ImagesDB, ImageData } from './db'

export interface ImageDBState {
  images: ImageMeta[]
}
type ImageDBReducer = Reducer<ImageDBState, any>

export const act_setImages = actionCtx<ImageDBState['images']>('setImages')
export const act_importImage = actionCtx<File>('importImage')
export const act_addImage = actionCtx<ImageMeta>('addImage')

const initState: ImageDBState = {
  images: []
}
const reducer: ImageDBReducer = (prev, action) =>
  act_setImages.do(action, (images) => ({
    ...prev,
    images
  })) ||
  act_addImage.do(action, (meta) => ({
    ...prev,
    images: [meta, ...prev.images]
  })) ||
  prev

export const useImageDb = () => {
  const { current: imagesDB } = useRef(new ImagesDB())
  const [state, _dispatch] = useReducer<ImageDBReducer>(reducer, initState)

  const dispatch = useCallback<typeof _dispatch>(
    (action) => {
      act_importImage.do(action, (file) =>
        importImageInDB(imagesDB, file).then(act_addImage(_dispatch))
      )
      _dispatch(action)
    },
    [imagesDB]
  )

  useEffect(() => {
    imagesDB.imageMeta.toArray().then(act_setImages(dispatch))
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

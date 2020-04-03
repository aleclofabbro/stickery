import { actionCtx, commandCtx } from 'lib/Actions'
import { Reducer, useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import { ImageMeta, StickeryDB, ImageData } from './db'

export interface ImageDBState {
  images: ImageMeta[]
}
type ImageDBReducer = Reducer<ImageDBState, any>

const cmd_int_set_DB_images = actionCtx<ImageDBState['images']>('cmd_int_set_DB_images')
const cmd_int_add_image_meta = actionCtx<ImageMeta>('cmd_int_add_image_meta')
export const cmd_imagedb_import_image_file = commandCtx<File, ImageMeta | null>(
  'cmd_import_image_file',
  null
)

const initState: ImageDBState = {
  images: []
}
const reducer: ImageDBReducer = (prev, action) => {
  if (cmd_int_set_DB_images.is(action)) {
    return {
      ...prev,
      images: action.payload
    }
  }
  if (cmd_int_add_image_meta.is(action)) {
    return {
      ...prev,
      images: [action.payload, ...prev.images]
    }
  }
  return prev
}

export const useImageDb = () => {
  const { current: imagesDB } = useRef(new StickeryDB())
  const [state, internalDispatch] = useReducer<ImageDBReducer>(reducer, initState)

  const dispatch = useCallback<typeof internalDispatch>(
    (action) => {
      cmd_imagedb_import_image_file.consume(action, (file) =>
        importImageInDB(imagesDB, file)
          .then(cmd_int_add_image_meta(internalDispatch))
          .then((action) => action.payload)
      )

      internalDispatch(action)
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

export const importImageInDB = async (imagesDB: StickeryDB, file: File): Promise<ImageMeta> => {
  const { name, size, lastModified, type } = file
  const src = createImageSrcUrl(name)
  const id = src

  // @ts-ignore
  const blob: Blob = await file.arrayBuffer()

  const imgData: ImageData = {
    blob,
    src: id
  }
  await imagesDB.imageData.add(imgData)
  const imgMeta: ImageMeta = {
    size,
    lastModified,
    name,
    type,
    src: id
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

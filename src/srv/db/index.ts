import Dexie from 'dexie'
import { actionCtx } from 'lib/reducer/Actions'
import { Reducer, useCallback, useEffect, useMemo, useReducer, useRef } from 'react'

class ImagesDB extends Dexie {
  imageData: Dexie.Table<ImageData, number>
  imageMeta: Dexie.Table<ImageMeta, number>
  constructor() {
    super('Stickery')
    this.version(1).stores({
      imageData: 'src, blob',
      imageMeta: 'src, name, type, size, lastModified'
    })
    this.imageData = this.table('imageData')
    this.imageMeta = this.table('imageMeta')
  }
}

export interface ImageData {
  src: string
  blob: Blob
}
export interface ImageMeta {
  name: string
  type: string
  size: number
  lastModified: number
  src: string
}
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
  const [state, _dispatch] = useReducer<ImageDBReducer>(reducer, initState)
  const { current: imagesDB } = useRef(new ImagesDB())

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
  }, [dispatch, imagesDB])

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

  // @ts-ignore
  const blob = await file.arrayBuffer()

  const imgData: ImageData = {
    //@ts-ignore
    blob,
    src
  }
  await imagesDB.imageData.add(imgData)
  const imgMeta: ImageMeta = {
    size,
    lastModified,
    name,
    type,
    src
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

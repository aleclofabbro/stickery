import Dexie from 'dexie'
import { useEffect, useMemo, useState } from 'react'
import { getImageSrcUrl } from '../importImage'

export interface ImageData {
  id?: number
  blob: Blob
}
export interface ImageMeta {
  id: number
  name: string
  type: string
  size: number
  lastModified: number
  src: string
}

class StickeryDatabase extends Dexie {
  imageData: Dexie.Table<ImageData, number>
  imageMeta: Dexie.Table<ImageMeta, number>

  constructor() {
    super('Stickery')
    this.version(1).stores({
      imageData: '++id, blob',
      imageMeta: 'id,src, name, type, size, lastModified'
    })
    this.imageData = this.table('imageData')
    this.imageMeta = this.table('imageMeta')
  }
}
export const stickeryDB = new StickeryDatabase()

export const useImagesStore = () => {
  const [images, setImagesMeta] = useState<ImageMeta[]>([])
  useEffect(() => {
    stickeryDB.imageMeta.toArray().then(setImagesMeta)
  }, [])
  useEffect(() => {
    const creating = (_primKey: string, newImageMeta: ImageMeta, _tx: Dexie.Transaction) => {
      setImagesMeta([newImageMeta, ...images])
    }
    const creatingHook = stickeryDB.imageMeta.hook('creating')
    creatingHook.subscribe(creating)
    return () => {
      creatingHook.unsubscribe(creating)
    }
  }, [images])
  return useMemo(() => {
    return { images, add: importFile }
  }, [images])
}

export const importFile = async (file: File): Promise<ImageMeta> => {
  const imgData: ImageData = {
    //@ts-ignore
    blob: await file.arrayBuffer()
  }
  const id = await stickeryDB.imageData.add(imgData)
  const imgMeta: ImageMeta = {
    size: file.size,
    lastModified: file.lastModified,
    name: file.name,
    type: file.type,
    src: getImageSrcUrl(file.name, id),
    id
  }
  await stickeryDB.imageMeta.add(imgMeta)
  return Promise.resolve(imgMeta)
}

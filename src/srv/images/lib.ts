import { ImageFileData, ImageFileMeta } from 'srv/@types/data'
import { StickeryDB } from 'srv/db'

export const createId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9)

export const getImageSrcUrl = (name: string, id: string) => `/_/images/${id}/${name}`
export const createImageSrcUrl = (name: string) => getImageSrcUrl(name, createId())

export async function getImageFileData(file: File): Promise<ImageFileData> {
  const { name } = file
  const src = createImageSrcUrl(name)
  // @ts-ignore
  const blob: Blob = await file.arrayBuffer()
  const imgData: ImageFileData = {
    blob,
    src
  }
  return imgData
}

export function getImageFileMeta(file: File, src: string): ImageFileMeta {
  const { name, size, lastModified, type } = file
  const imgMeta: ImageFileMeta = {
    size,
    lastModified,
    name,
    type,
    src
  }
  return imgMeta
}

export async function importImageFile(db: StickeryDB, file: File) {
  const imageData = await getImageFileData(file)
  const imageMeta = getImageFileMeta(file, imageData.src)
  return Promise.all([db.imageData.add(imageData), db.imageMeta.add(imageMeta)]).then(() => ({
    imageData,
    imageMeta
  }))
}

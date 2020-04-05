import { ImageFileData, ImageFileMeta } from 'srv/@types/data'
import { StickeryDB } from 'srv/db'

export const createId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9)

export const getImageSrcUrl = (name: string, id: string) => `/_/images/${id}/${name}`
export const createImageSrcUrl = (name: string) => getImageSrcUrl(name, createId())

export async function getImageFileData(file: File, src: string): Promise<ImageFileData> {
  const { size } = file
  // @ts-ignore
  const blob: Blob = await file.arrayBuffer()
  const imgData: ImageFileData = {
    blob,
    src,
    size
  }
  return imgData
}

export async function getImageFileMeta(file: File, src: string): Promise<ImageFileMeta> {
  return new Promise((resolve, reject) => {
    const { name, lastModified, type } = file
    var url = URL.createObjectURL(file)
    var img = new Image()

    img.onload = () => {
      const imgMeta: ImageFileMeta = {
        height: img.height,
        width: img.width,
        lastModified,
        name,
        type,
        src
      }
      resolve(imgMeta)
    }

    img.src = url
  })
}

export async function importImageFile(db: StickeryDB, file: File) {
  const src = createImageSrcUrl(file.name)
  const imageMeta = await getImageFileMeta(file, src)
  const imageData = await getImageFileData(file, src)
  return Promise.all([db.imageData.add(imageData), db.imageMeta.add(imageMeta)]).then(() => ({
    imageData,
    imageMeta
  }))
}

import { stickeryDB, ImageFile } from './db'

export const importImage = async (file: File): Promise<string> => {
  console.log(file)
  const imgFile: ImageFile = {
    //@ts-ignore
    data: await file.arrayBuffer(),
    size: file.size,
    lastModified: file.lastModified,
    name: file.name,
    type: file.type
  }
  const id = await stickeryDB.images.add(imgFile)
  const img = await stickeryDB.images.get(id)
  console.log(img)
  return Promise.resolve(`/_/images/${id}/${file.name}`)
}

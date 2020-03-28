import Dexie from 'dexie'
export interface ImageData {
  id: string
  blob: Blob
}
export interface ImageMeta {
  name: string
  type: string
  size: number
  lastModified: number
  id: string
}
export class ImagesDB extends Dexie {
  imageData: Dexie.Table<ImageData, string>
  imageMeta: Dexie.Table<ImageMeta, string>
  constructor() {
    super('Stickery')
    this.version(1).stores({
      imageData: 'id, blob',
      imageMeta: 'id, name, type, size, lastModified'
    })
    this.imageData = this.table('imageData')
    this.imageMeta = this.table('imageMeta')
  }
}

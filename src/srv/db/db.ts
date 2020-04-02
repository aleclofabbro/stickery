import Dexie from 'dexie'
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
export class ImagesDB extends Dexie {
  imageData: Dexie.Table<ImageData, string>
  imageMeta: Dexie.Table<ImageMeta, string>
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

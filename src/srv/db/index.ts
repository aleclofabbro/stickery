import Dexie from 'dexie'

export interface ImageFile {
  id?: number
  name: string
  type: string
  size: number
  lastModified: number
  data: Blob
}

class StickeryDatabase extends Dexie {
  images: Dexie.Table<ImageFile, number>

  constructor() {
    super('Stickery')
    this.version(1).stores({
      images: '++id, name, type, data'
    })
    this.images = this.table('images') // Just informing Typescript what Dexie has already done...
  }
}
export const stickeryDB = new StickeryDatabase()

import Dexie from 'dexie'
import { Project } from 'srv/project'
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
export class StickeryDB extends Dexie {
  projects: Dexie.Table<Project, number>
  imageData: Dexie.Table<ImageData, string>
  imageMeta: Dexie.Table<ImageMeta, string>
  constructor() {
    super('Stickery')
    this.version(1).stores({
      imageData: 'src, blob',
      imageMeta: 'src, name, type, size, lastModified',
      projects: '++id, name, background, objects'
    })
    this.imageData = this.table('imageData')
    this.imageMeta = this.table('imageMeta')
    this.projects = this.table('projects')
  }
}

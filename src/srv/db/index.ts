import Dexie from 'dexie'
import { createContext, useContext } from 'react'
import { ImageFileData, ImageFileMeta, ProjectData } from 'srv/@types/data'

export class StickeryDB extends Dexie {
  projects: Dexie.Table<ProjectData, number>
  imageData: Dexie.Table<ImageFileData, string>
  imageMeta: Dexie.Table<ImageFileMeta, string>
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

export const StickeryDBCtx = createContext(new StickeryDB())
export const useStickeryDB = () => useContext(StickeryDBCtx)

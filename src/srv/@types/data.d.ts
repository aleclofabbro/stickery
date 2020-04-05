export interface ImageFileData {
  src: string
  size: number
  blob: Blob
}
export type ProjectObject = {
  image: ImageFileMeta
}

export interface ProjectData {
  name: string
  background: ImageFileMeta
  objects: ProjectObject[]
}

export interface Dimensions {
  width: number
  height: number
}
export interface ImageFileMeta extends Dimensions {
  name: string
  type: string
  lastModified: number
  src: string
}

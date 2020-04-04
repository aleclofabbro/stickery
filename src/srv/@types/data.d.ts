export interface ImageFileData {
  src: string
  blob: Blob
}
export interface ProjectData {
  name: string
  background: string
  objects: ProjectObject[]
}

export interface ImageFileMeta {
  name: string
  type: string
  size: number
  lastModified: number
  src: string
}

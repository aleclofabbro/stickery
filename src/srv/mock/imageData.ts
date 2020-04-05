import { Dimensions, ImageFileMeta } from 'srv/@types/data'

export const mockImageFileMeta = (
  partImageMeta: Partial<ImageFileMeta> & Dimensions,
  type = 'jpg'
): ImageFileMeta => ({
  ...partImageMeta,
  lastModified: 1111,
  name: 'noname',
  src: `https://picsum.photos/${partImageMeta.width}/${partImageMeta.height}.${type}`,
  type
})

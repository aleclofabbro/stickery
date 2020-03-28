import React, { CSSProperties, FC, SFC, useCallback, useMemo } from 'react'
import { useFileChooser } from '../../../lib/hook/useFileChooser'
import { Button } from 'ui/elements/button'
import { ImageMeta } from 'srv/db/db'

export interface Image {
  src: string
  thumbnail: string
  thumbnailWidth: number
  thumbnailHeight: number
}
export interface ImageGallery {
  onClickImage(meta: ImageMeta): unknown
  images: ImageMeta[]
  add(_: File): unknown
}
export const ImageGallery: SFC<ImageGallery> = ({ onClickImage, images, add }) => {
  const [openFileChooser] = useFileChooser({ onFileChoosen: add })

  const galleryItems = useMemo<GalleryItem[]>(
    () => images.map((image) => ({ image, onClickImage: () => onClickImage(image) })),
    [images, onClickImage]
  )

  return (
    <div style={templateStyle}>
      <div style={headStyle}>
        <Button onClick={openFileChooser}>scegli file</Button>
        <br />
        <span>o incolla</span>
      </div>
      <div style={galleryContainerStyle}>
        {galleryItems.map((galleryItem) => (
          <GalleryItem key={galleryItem.image.id} {...galleryItem} />
        ))}
      </div>
    </div>
  )
}

export interface GalleryItem {
  image: ImageMeta
  onClickImage(_: ImageMeta): unknown
}
export const GalleryItem: FC<GalleryItem> = ({ image, onClickImage }) => {
  const onClick = useCallback(() => onClickImage(image), [image, onClickImage])
  return <img onClick={onClick} src={image.id} alt={image.name} />
}
const templateStyle: CSSProperties = {
  display: 'grid',
  gridTemplate: `
  "head" 20px
  "gallery" auto
  `,
  position: 'absolute',
  top: 0,
  bottom: 0
}

const headStyle: CSSProperties = {
  gridArea: 'head'
}

const galleryContainerStyle: CSSProperties = {
  gridArea: 'gallery',
  overflowY: 'auto',
  overflowX: 'hidden'
}

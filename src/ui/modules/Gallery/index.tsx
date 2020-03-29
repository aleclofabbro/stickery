import { actionCtx } from 'lib/Actions'
import React, { CSSProperties, FC, SFC, useCallback } from 'react'
import { ImageMeta } from 'srv/db/db'
import { Button } from 'ui/elements/button'
import { useGalleryProps } from './useGalleryProps'

export interface Image {
  src: string
  thumbnail: string
  thumbnailWidth: number
  thumbnailHeight: number
}
export const act_clickImage = actionCtx<ImageMeta>('act_clickImage')
export interface ImageGallery {}
export const ImageGallery: SFC<ImageGallery> = () => {
  const { clickImage, images, openFileChooser } = useGalleryProps()
  return (
    <div style={templateStyle}>
      <div style={headStyle}>
        <Button onClick={openFileChooser}>scegli file</Button>
        <br />
        <span>o incolla</span>
      </div>
      <div style={galleryContainerStyle}>
        {images.map((image) => (
          <GalleryItem key={image.id} image={image} onClickImage={clickImage} />
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

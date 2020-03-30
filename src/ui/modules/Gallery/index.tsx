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
  return (
    <div style={imageDivStyle} onClick={onClick}>
      <img style={imageStyle} src={image.id} alt={image.name} />
    </div>
  )
}
const imageStyle: CSSProperties = {
  width: '100%'
}
const imageDivStyle: CSSProperties = {
  maxWidth: '100%',
  borderColor: 'light-gray',
  borderWidth: 0.8,
  padding: '3px',
  margin: '3px'
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

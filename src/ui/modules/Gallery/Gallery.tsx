import React, { CSSProperties, FC } from 'react'
import { Button } from 'ui/elements/button/Button'
import { ComponentArray } from '@types'

export interface Gallery {
  openFileChooser(): unknown
  GalleryItems: ComponentArray
}
export const Gallery: FC<Gallery> = ({ GalleryItems, openFileChooser }) => {
  return (
    <div style={templateStyle}>
      <div style={headStyle}>
        <Button onClick={openFileChooser}>scegli file</Button>
        <br />
        <span>o incolla</span>
      </div>
      <div style={galleryContainerStyle}>
        {GalleryItems.map(([key, Item]) => (
          <Item key={key} />
        ))}
      </div>
    </div>
  )
}

export interface GalleryItem {
  image: {
    src: string
    name: string
  }
  clickImage(): unknown
}
export const GalleryItem: FC<GalleryItem> = ({ image, clickImage }) => {
  return (
    <div style={imageDivStyle} onClick={clickImage}>
      <img style={imageStyle} src={image.src} alt={image.name} />
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

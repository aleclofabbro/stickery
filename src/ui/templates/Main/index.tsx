import React, { CSSProperties, SFC } from 'react'
import { ImageGallery } from 'ui/modules/Gallery'

export interface MainTpl {
  imageGalleryProps: ImageGallery
}
export const MainTpl: SFC<MainTpl> = ({ imageGalleryProps: ImageGalleryProps }) => {
  return (
    <div style={outerStyle}>
      <div style={canvasStyle}>
        <ImageGallery {...ImageGalleryProps} />
      </div>
    </div>
  )
}
const outerStyle: CSSProperties = {
  display: 'grid',
  gridTemplate: `
    "canvas" auto
  `
}
const canvasStyle: CSSProperties = {
  gridArea: 'canvas',
  backgroundColor: '#1a1a1a'
}

import React, { ComponentType, CSSProperties, SFC } from 'react'

export interface Main {
  GalleryComp: ComponentType
}
export const Main: SFC<Main> = ({ GalleryComp }) => {
  return (
    <div style={outerStyle}>
      <div style={canvasStyle}>
        <GalleryComp />
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

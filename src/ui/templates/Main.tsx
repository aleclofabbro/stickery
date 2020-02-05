import React, { CSSProperties, SFC } from 'react'

export interface MainTpl {
  TopBar: JSX.Element
  Canvas: JSX.Element
}
export const MainTpl: SFC<MainTpl> = ({ Canvas, TopBar }) => {
  return (
    <div style={outerStyle}>
      <div style={topBarStyle}>{TopBar}</div>
      <div style={canvasStyle}>{Canvas}</div>
    </div>
  )
}
const outerStyle: CSSProperties = {
  display: 'grid',
  gridTemplate: `
  "top-bar" 20px
  "canvas" auto
  `
}
const topBarStyle: CSSProperties = {
  gridArea: 'top-bar',
  backgroundColor: '#262626'
}
const canvasStyle: CSSProperties = {
  gridArea: 'canvas',
  backgroundColor: '#1a1a1a'
}

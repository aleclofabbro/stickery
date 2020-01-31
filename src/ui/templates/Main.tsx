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
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
}
const topBarStyle: CSSProperties = {
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: '95%',
  backgroundColor: '#262626'
}
const canvasStyle: CSSProperties = {
  position: 'fixed',
  left: 0,
  top: '5%',
  right: 0,
  bottom: 0,
  backgroundColor: '#1a1a1a'
}

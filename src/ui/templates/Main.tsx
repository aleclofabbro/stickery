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
  top: '95%',
  right: 0,
  bottom: 0,
  backgroundColor: 'dark-gray'
}
const topBarStyle: CSSProperties = {
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: '95%',
  backgroundColor: 'light-gray'
}
const canvasStyle: CSSProperties = {
  position: 'fixed',
  left: 0,
  top: '5%',
  right: 0,
  bottom: 0,
  backgroundColor: 'blue'
}

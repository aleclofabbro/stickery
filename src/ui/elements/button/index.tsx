import React, { SFC, CSSProperties } from 'react'

export interface Button {
  onClick(): unknown
  style?: CSSProperties
}

export const Button: SFC<Button> = ({ onClick, style, children }) => {
  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  )
}

export const btnStyle: CSSProperties = {
  float: 'left',
  backgroundColor: 'gray'
}

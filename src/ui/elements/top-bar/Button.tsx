import React, { SFC, CSSProperties } from 'react'

export interface TopBarButton {
  onClick(): any
}
export const TopBarButton: SFC<TopBarButton> = ({ onClick, children }) => {
  return (
    <button style={btnStyle} onClick={onClick}>
      {children}
    </button>
  )
}
const btnStyle: CSSProperties = {
  float: 'left',
  backgroundColor: 'gray'
}

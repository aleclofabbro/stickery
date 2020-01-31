import React, { SFC, CSSProperties } from 'react'
import { Button } from '../basic/Button'

export interface TopBarButton {
  onClick(): unknown
}
export const TopBarButton: SFC<TopBarButton> = ({ onClick, children }) => {
  return (
    <Button style={btnStyle} onClick={onClick}>
      {children}
    </Button>
  )
}
const btnStyle: CSSProperties = {
  float: 'left',
  backgroundColor: 'gray'
}

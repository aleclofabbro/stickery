import React, { CSSProperties, SFC } from 'react'
import { FabricCanvas } from '../../srv/fabric/canvas'

export const MainCanvasHoc: SFC = () => {
  return (
    <div style={mainCanvasStyle}>
      <FabricCanvas></FabricCanvas>
    </div>
  )
}

const mainCanvasStyle: CSSProperties = {
  // position: 'absolute',
  // top: 0,
  // bottom: 0,
  // left: 0,
  // right: 0
}

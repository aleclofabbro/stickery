import React, { CSSProperties, SFC, useRef } from 'react'
import { useFabricCanvas } from '../../srv/fabric/canvas'

export const MainCanvasHoc: SFC = () => {
  const ref = useRef<HTMLCanvasElement>(null)
  useFabricCanvas({ ref })

  return <canvas style={mainCanvasStyle} ref={ref}></canvas>
}

const mainCanvasStyle: CSSProperties = {
  // position: 'absolute',
  // top: 0,
  // bottom: 0,
  // left: 0,
  // right: 0
}

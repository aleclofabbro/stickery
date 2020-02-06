import React, { CSSProperties, SFC, useRef, useEffect } from 'react'
import { useFabricCanvas } from '../../srv/fabric/canvas'

export const MainCanvasHoc: SFC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { set } = useFabricCanvas()
  useEffect(() => {
    const div = ref.current
    if (div) {
      set(div)
    }
  }, [set])

  return <div style={mainCanvasStyle} ref={ref}></div>
}

const mainCanvasStyle: CSSProperties = {
  // position: 'absolute',
  // top: 0,
  // bottom: 0,
  // left: 0,
  // right: 0
}

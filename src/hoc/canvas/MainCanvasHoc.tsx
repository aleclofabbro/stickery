import { fabric } from 'fabric'
import React, { SFC, useEffect, useRef, CSSProperties, useCallback } from 'react'
import { useProjectState } from '../../state/project'
import { ICanvasOptions } from 'fabric/fabric-impl'
export const MainCanvasHoc: SFC = () => {
  const ref = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas>()

  const { state } = useProjectState()
  useEffect(() => {
    if (!ref.current) {
      return
    }
    fabricCanvasRef.current = new fabric.Canvas(ref.current, canvasOpts)
  }, [])

  const redrawCanvas = useCallback(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas) {
      return
    }
    canvas.setHeight(window.innerHeight)
    canvas.setWidth(window.innerWidth)
    if (state.background) {
      const bg = state.background
      canvas.setBackgroundImage(bg, () => {
        fabric.Image.fromURL(bg, (img) => {
          const zoom = Math.min(
            canvas.getHeight() / (img.height || 1),
            canvas.getWidth() / (img.width || 1)
          )
          canvas.setZoom(zoom)
          canvas.renderAll()
        })
      })
    } else {
      canvas.renderAll()
    }
  }, [state.background])

  useEffect(redrawCanvas, [state.background, redrawCanvas])

  useEffect(() => {
    // resize on init
    window.addEventListener('resize', redrawCanvas, false)
    return () => {
      window.removeEventListener('resize', redrawCanvas, false)
    }
  }, [redrawCanvas])

  return <canvas style={mainCanvasStyle} ref={ref}></canvas>
}

const mainCanvasStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

const canvasOpts: ICanvasOptions = {
  interactive: true
}

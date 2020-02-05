import { fabric } from 'fabric'

import { useRef, useEffect, useCallback } from 'react'

import { useProjectState } from '../../state/project'

const canvasOpts: fabric.ICanvasOptions = {
  interactive: true
}

export interface UseFabricCanvas {
  ref: React.RefObject<HTMLCanvasElement>
}

export const useFabricCanvas = ({ ref }: UseFabricCanvas) => {
  const fabricCanvasRef = useRef<fabric.Canvas>()

  const { state } = useProjectState()
  useEffect(() => {
    if (!ref.current) {
      return
    }
    fabricCanvasRef.current = new fabric.Canvas(ref.current, canvasOpts)
  }, [ref])

  const redrawCanvas = useCallback(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas) {
      return
    }
    canvas.setHeight(window.innerHeight - 20)
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
}

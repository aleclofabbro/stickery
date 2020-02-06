import { fabric } from 'fabric'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useProjectState } from '../../state/project'

const canvasOpts: fabric.ICanvasOptions = {
  interactive: true
}

let canvas: fabric.Canvas | null = null
export const useFabricCanvas = () => {
  const { state } = useProjectState()
  const [bgImage, setBgImage] = useState<fabric.Image>()
  const resizeCanvas = useCallback(() => {
    const _canvas = canvas
    if (!(_canvas && bgImage)) {
      return
    }

    const dim = {
      height: window.innerHeight - 20,
      width: window.innerWidth
    }
    const zoom = Math.min(dim.height / (bgImage.height || 1), dim.width / (bgImage.width || 1))

    _canvas.setDimensions(dim)
    _canvas.setZoom(zoom)
    _canvas.renderAll()
  }, [bgImage])
  useEffect(() => resizeCanvas(), [bgImage, resizeCanvas])

  useEffect(() => {
    const _canvas = canvas
    const bg = state.background
    if (!(_canvas && bg)) {
      return
    }
    fabric.Image.fromURL(bg, (img) => {
      _canvas.setBackgroundImage(img, () => {
        setBgImage(img)
      })
    })
  }, [state.background])

  useEffect(() => {
    // resize on init
    window.addEventListener('resize', resizeCanvas, false)
    return () => {
      window.removeEventListener('resize', resizeCanvas, false)
    }
  }, [resizeCanvas])

  return useMemo(() => {
    return {
      set: (elem: HTMLElement) => {
        const canvasElem = document.createElement('canvas')
        elem.appendChild(canvasElem)
        canvas = new fabric.Canvas(canvasElem, canvasOpts)
      }
    }
  }, [])
}

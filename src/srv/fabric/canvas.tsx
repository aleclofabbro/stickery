import { fabric } from 'fabric'
import throttle from 'lodash/throttle'
import React, { createContext, SFC, useContext, useEffect, useMemo, useRef, useState } from 'react'

const canvasOpts: fabric.ICanvasOptions = {
  interactive: true
}

export interface FabricCanvasCtx {
  setCanvas(canvas: fabric.Canvas): unknown
}
const FabricCanvasCtx = createContext<FabricCanvasCtx>({} as FabricCanvasCtx)

export interface FabricCanvasCtrl {
  setBackground(url: string): unknown
}
const FabricCanvasCtrl = createContext<FabricCanvasCtrl | null>(null)

export interface FabricCanvasCtxProvider {
  setState(_: string): unknown
}
export const FabricCanvasCtxProvider: SFC<FabricCanvasCtxProvider> = ({ children, setState }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const ctl = useMemo<FabricCanvasCtrl | null>(() => {
    if (!canvas) {
      return null
    }
    const setBackground = (url: string) => {
      fabric.Image.fromURL(url, (img) => {
        canvas.setBackgroundImage(img, () => {
          resizeCanvas(canvas)
          setState(canvas.toDatalessJSON())
        })
      })
    }
    return {
      setBackground
    }
  }, [canvas, setState])
  const ctx = useMemo(() => {
    return { setCanvas }
  }, [])
  return (
    <FabricCanvasCtx.Provider value={ctx}>
      <FabricCanvasCtrl.Provider value={ctl}>{children}</FabricCanvasCtrl.Provider>
    </FabricCanvasCtx.Provider>
  )
}
export const useCanvasCtrl = () => {
  return useContext(FabricCanvasCtrl)
}
const resizeCanvas = (canvas: fabric.Canvas) => {
  if (!canvas) {
    return
  }

  const dim = {
    height: window.innerHeight - 20,
    width: window.innerWidth
  }
  canvas.setDimensions(dim)

  const bgImg = canvas.backgroundImage
  if ('undefined' === typeof bgImg) {
    canvas.setZoom(1)
    canvas.renderAll()
  } else if (bgImg instanceof fabric.Image) {
    setZoom(bgImg)
  } else {
    fabric.Image.fromURL(bgImg, setZoom)
  }

  function setZoom(bgImage: fabric.Image) {
    const zoom = Math.min(dim.height / (bgImage.height || 1), dim.width / (bgImage.width || 1))
    canvas.setZoom(zoom)
    canvas.renderAll()
  }
}

export interface FabricCanvas {}
export const FabricCanvas: SFC<FabricCanvas> = () => {
  const ctx = useContext(FabricCanvasCtx)

  const canvasRef = useRef<fabric.Canvas>()

  useEffect(() => {
    // resize on init
    const resizeHandler = throttle(
      () => {
        if (!canvasRef.current) {
          return
        }
        resizeCanvas(canvasRef.current)
      },
      10,
      { trailing: true }
    )
    window.addEventListener('resize', resizeHandler, false)
    return () => {
      window.removeEventListener('resize', resizeHandler, false)
    }
  }, [])
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvasElem = ref.current
    if (canvasElem) {
      canvasRef.current = new fabric.Canvas(canvasElem, canvasOpts)
      resizeCanvas(canvasRef.current)
      ctx.setCanvas(canvasRef.current)
    }
  }, [ctx])
  return <canvas ref={ref}></canvas>
}

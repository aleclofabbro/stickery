import Hammer from 'hammerjs'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'

export type Transforms = {
  size: Size
  pos: Position
}
let X = false
type Size = number
interface Position {
  x: number
  y: number
}
export function useTransform(elemRef: MutableRefObject<HTMLElement | null>) {
  const [size, setSize] = useState<Size>(1)
  const sizeRef = useRef(size)

  const [pos, setPos] = useState<Position>({ x: 0, y: 0 })
  const posRef = useRef(pos)

  const [mc, setMc] = useState<HammerManager | null>(null)
  const { current: transformStyle } = useRef(() => {
    if (elemRef.current) {
      elemRef.current.style.transform = `scale(${sizeRef.current}) translate(${posRef.current.x}px,${posRef.current.y}px)`
    }
  })
  useEffect(transformStyle, [])
  const setup = useRef(false)
  useEffect(() => {
    if (!mc || !elemRef || setup.current) {
      return
    }

    mc.add(new Hammer.Pinch({ event: 'pinch' }))
    mc.on('pinchstart', (ev) => {
      if (X) {
        return
      }
      X = true
      const basePos = {
        x: posRef.current.x * sizeRef.current,
        y: posRef.current.y * sizeRef.current
      }
      const { current: baseSize } = sizeRef
      const pinch = ({ scale }: HammerInput) => {
        sizeRef.current = scale * baseSize
        posRef.current = {
          x: basePos.x / sizeRef.current,
          y: basePos.y / sizeRef.current
        }
        transformStyle()
      }
      const pinchend = () => {
        setSize(sizeRef.current)
        setPos(posRef.current)
        mc.off('pinchend', pinchend)
        mc.off('pinch', pinch)
        X = false
      }
      mc.on('pinchend', pinchend)
      mc.on('pinch', pinch)
    })

    mc.add(new Hammer.Pan({ event: 'pan', interval: 1000 }))
    mc.on('panstart', (ev) => {
      if (X) {
        return
      }
      X = true
      const basePos = {
        x: posRef.current.x, // sizeRef.current,
        y: posRef.current.y // sizeRef.current
      }
      // console.log('panstart')
      // console.table({ basePos, posRef: posRef.current, sizeRef: sizeRef.current })
      const pan = ({ deltaX, deltaY }: HammerInput) => {
        posRef.current = {
          x: basePos.x + deltaX / sizeRef.current,
          y: basePos.y + deltaY / sizeRef.current
        }
        // console.log('pan')
        // console.table({ posRef: posRef.current, delta: { x: deltaX, y: deltaY } })
        transformStyle()
      }
      const panend = () => {
        mc.off('pan', pan)
        mc.off('panend', panend)
        setPos(posRef.current)
        X = false
      }

      mc.on('panend', panend)
      mc.on('pan', pan)
    })

    setup.current = true
  }, [elemRef, mc, transformStyle])
  useEffect(() => {
    if (!elemRef.current) {
      return
    }
    const _mc = new Hammer.Manager(elemRef.current, { domEvents: true })
    setMc(_mc)
    return () => {
      setup.current = false
      _mc.destroy()
    }
  }, [elemRef])

  return useMemo<Transforms>(() => {
    const transforms: Transforms = {
      size,
      pos
    }

    //console.table(transforms)
    return transforms
  }, [pos, size])
}

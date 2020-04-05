import Hammer from 'hammerjs'
import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
  ComponentType,
  FC
} from 'react'

export type Transform = {
  scale: Scale
  pos: Position
}

//FIXME: ___REMOVE___THIS__SEMAPHORE__
let ___REMOVE___THIS__SEMAPHORE__ = false

type Scale = number
interface Position {
  x: number
  y: number
}
interface TransformCtx {
  transform: Transform
}
export const TransformCtx = createContext<TransformCtx>({
  transform: {
    pos: { x: 0, y: 0 },
    scale: 1
  }
})
export function useTransform(
  elemRef: MutableRefObject<HTMLElement | null>
): [Transform, ComponentType] {
  const parentTranform = useContext(TransformCtx)

  const [scale, setScale] = useState<Scale>(1)
  const scaleRef = useRef(scale)

  const [pos, setPos] = useState<Position>({ x: 0, y: 0 })
  const posRef = useRef(pos)

  const [mc, setMc] = useState<HammerManager | null>(null)
  const { current: transformStyle } = useRef(() => {
    if (elemRef.current) {
      elemRef.current.style.transform = `scale(${scaleRef.current}) translate(${posRef.current.x}px,${posRef.current.y}px)`
    }
  })
  useEffect(transformStyle, [])
  const setup = useRef(false)
  useEffect(() => {
    if (!mc || setup.current) {
      return
    }

    mc.add(new Hammer.Pinch({ event: 'pinch' }))
    mc.on('pinchstart', (ev) => {
      if (___REMOVE___THIS__SEMAPHORE__) {
        return
      }
      ___REMOVE___THIS__SEMAPHORE__ = true
      const basePos = {
        x: posRef.current.x * scaleRef.current,
        y: posRef.current.y * scaleRef.current
      }
      const { current: baseSize } = scaleRef
      const pinch = ({ scale }: HammerInput) => {
        scaleRef.current = scale * baseSize
        posRef.current = {
          x: (basePos.x / scaleRef.current) * parentTranform.transform.scale,
          y: (basePos.y / scaleRef.current) * parentTranform.transform.scale
        }
        transformStyle()
      }
      const pinchend = () => {
        setScale(scaleRef.current)
        setPos(posRef.current)
        mc.off('pinchend', pinchend)
        mc.off('pinch', pinch)
        setTimeout(() => (___REMOVE___THIS__SEMAPHORE__ = false), 10)
      }
      mc.on('pinchend', pinchend)
      mc.on('pinch', pinch)
    })

    mc.add(new Hammer.Pan({ event: 'pan', interval: 1000 }))
    mc.on('panstart', (ev) => {
      if (___REMOVE___THIS__SEMAPHORE__) {
        return
      }
      ___REMOVE___THIS__SEMAPHORE__ = true
      const basePos = {
        x: posRef.current.x, // sizeRef.current,
        y: posRef.current.y // sizeRef.current
      }
      // console.log('panstart')
      // console.table({ basePos, posRef: posRef.current, sizeRef: sizeRef.current })
      const pan = ({ deltaX, deltaY }: HammerInput) => {
        posRef.current = {
          x: basePos.x + (deltaX / scaleRef.current) * parentTranform.transform.scale,
          y: basePos.y + (deltaY / scaleRef.current) * parentTranform.transform.scale
        }
        // console.log('pan')
        // console.table({ posRef: posRef.current, delta: { x: deltaX, y: deltaY } })
        transformStyle()
      }
      const panend = () => {
        mc.off('pan', pan)
        mc.off('panend', panend)
        setPos(posRef.current)
        setTimeout(() => (___REMOVE___THIS__SEMAPHORE__ = false), 10)
      }

      mc.on('panend', panend)
      mc.on('pan', pan)
    })

    setup.current = true
  }, [mc, parentTranform.transform.scale, transformStyle])

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

  return useMemo<[Transform, ComponentType]>(() => {
    const transform: Transform = {
      scale,
      pos
    }
    const transformCtx: TransformCtx = {
      transform: {
        pos: {
          x: pos.x + parentTranform.transform.pos.x,
          y: pos.y + parentTranform.transform.pos.y
        },
        scale: scale * parentTranform.transform.scale
      }
    }
    const Provider: FC = ({ children }) => (
      <TransformCtx.Provider value={transformCtx}>{children}</TransformCtx.Provider>
    )
    //console.table(transforms)
    return [transform, Provider]
  }, [
    parentTranform.transform.pos.x,
    parentTranform.transform.pos.y,
    parentTranform.transform.scale,
    pos,
    scale
  ])
}

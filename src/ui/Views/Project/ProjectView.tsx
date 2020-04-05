import { useTransform } from 'lib/hook/useTransforms'
import React, { CSSProperties, FC, useMemo, useRef } from 'react'
import { Dimensions, ImageFileMeta } from 'srv/@types/data'
import { ComponentArray } from '@types'

export interface ProjectView {
  background: ImageFileMeta
  Objects: ComponentArray
}
export const ProjectView: FC<ProjectView> = ({ background, Objects }) => {
  const bgRef = useRef<HTMLImageElement | null>(null)
  useTransform(bgRef)
  const dimensions = useFitInWindowDim(background)
  const containerStyle = useMemo<CSSProperties>(
    () => ({
      ..._containerStyle,
      backgroundImage: `url(${background.src})`,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`
    }),
    [background, dimensions]
  )
  return (
    <div ref={bgRef} style={containerStyle}>
      {Objects.map(([key, Obj]) => (
        <Obj key={key} />
      ))}
    </div>
  )
}

const _containerStyle: CSSProperties = {
  // border: '5px solid yellow',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  margin: 'auto',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  right: 0
}

export const useFitInWindowDim = (dim: Dimensions, scale = 1) =>
  useMemo(() => fitInWindowDim(dim, scale), [dim, scale])

export function fitInWindowDim(dim: Dimensions, scale = 1): Dimensions {
  const clientDim: Dimensions = {
    height: window.innerHeight,
    width: window.innerWidth
  }

  const ratio = fitRatio(dim, clientDim)
  const result: Dimensions = {
    height: dim.height * ratio * scale,
    width: dim.width * ratio * scale
  }
  console.table({ ratio, clientDim, dim, result })
  return result
}

export const fitRatio = (dim: Dimensions, targetDim: Dimensions) =>
  Math.min(targetDim.height / dim.height, targetDim.width / dim.width)

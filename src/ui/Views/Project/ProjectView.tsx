import { useTransform } from 'lib/hook/useTransforms'
import React, { CSSProperties, FC, useRef, useMemo } from 'react'
import { ProjectData, Dimensions } from 'srv/@types/data'

export interface ProjectView {
  project: ProjectData
}
export const ProjectView: FC<ProjectView> = ({ project }) => {
  const bgRef = useRef<HTMLImageElement | null>(null)
  useTransform(bgRef)
  const { background } = project
  const dimensions = useFit(background)
  const containerStyle = useMemo<CSSProperties>(
    () => ({
      ..._containerStyle,
      backgroundImage: `url(${background.src})`,
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`
    }),
    [background, dimensions]
  )
  return <div ref={bgRef} style={containerStyle}></div>
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

const useFit = (dim: Dimensions) => useMemo(() => fitInWindowDim(dim), [dim])

function fitInWindowDim(dim: Dimensions): Dimensions {
  const clientDim: Dimensions = {
    height: window.innerHeight,
    width: window.innerWidth
  }

  const ratio = fitRatio(dim, clientDim)
  const result: Dimensions = {
    height: dim.height * ratio,
    width: dim.width * ratio
  }
  console.table({ ratio, clientDim, dim, result })
  return result
}

const fitRatio = (dim: Dimensions, targetDim: Dimensions) =>
  Math.min(targetDim.height / dim.height, targetDim.width / dim.width)

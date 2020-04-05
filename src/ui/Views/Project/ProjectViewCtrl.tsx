import { useTransform } from 'lib/hook/useTransforms'
import React, { CSSProperties, FC, useMemo, useRef } from 'react'
import { useStickeryState } from 'srv'
import { ProjectObject } from 'srv/@types/data'
import { ProjectView } from '.'
import { useFitInWindowDim } from './ProjectView'

export interface ProjectViewCtrl {}
export const ProjectViewCtrl: FC<ProjectViewCtrl> = () => {
  const { project } = useStickeryState()
  const props = useMemo<ProjectView | null>(() => {
    if (!project) {
      return null
    }
    const Objects: ProjectView['Objects'] = project.objects.map((obj) => [
      obj.image.src,
      () => PrjObj({ obj })
    ])
    const props: ProjectView = {
      background: project.background,
      Objects
    }
    return props
  }, [project])
  return props && <ProjectView {...props} />
}

const PrjObj: FC<{ obj: ProjectObject }> = ({ obj }) => {
  const objRef = useRef<HTMLImageElement | null>(null)
  useTransform(objRef)
  const fitDim = useFitInWindowDim(obj.image, 0.25)
  const style = useMemo<CSSProperties>(
    () => ({
      ...fitDim
    }),
    [fitDim]
  )

  return <img ref={objRef} alt={obj.image.name} src={obj.image.src} style={style} />
}

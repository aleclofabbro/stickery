import React, { FC, useMemo } from 'react'
import { useStickeryState } from 'srv'
import { ProjectView } from 'ui/Views/Project'

export interface ProjectViewCtrl {}
export const ProjectViewCtrl: FC<ProjectViewCtrl> = () => {
  const {
    project: { current: project }
  } = useStickeryState()
  const props = useMemo<ProjectView | null>(() => {
    return (
      project && {
        project
      }
    )
  }, [project])
  return props && <ProjectView {...props} />
}

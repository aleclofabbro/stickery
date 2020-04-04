import React, { FC } from 'react'
import { ProjectData } from 'srv/@types/data'

export interface ProjectView {
  project: ProjectData
}
export const ProjectView: FC<ProjectView> = ({ project }) => {
  return <pre>{`${JSON.stringify(project, null, 4)}`}</pre>
}

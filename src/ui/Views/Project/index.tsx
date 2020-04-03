import React, { FC } from 'react'
import { Project } from 'srv/project'

export interface ProjectView {
  project: Project
}
export const ProjectView: FC<ProjectView> = ({ project }) => {
  return <pre>{`${JSON.stringify(project, null, 4)}`}</pre>
}

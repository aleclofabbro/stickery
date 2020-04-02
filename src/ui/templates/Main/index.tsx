import React, { ComponentType, CSSProperties, FC } from 'react'

export enum MainView {
  Project,
  NewProject
}
export interface BaseMain<View extends MainView> {
  view: View
}
export interface ProjectView extends BaseMain<MainView.Project> {
  ProjectComp: ComponentType
}
export interface NewProjectView extends BaseMain<MainView.NewProject> {
  NewProjectComp: ComponentType
}

export type Main = ProjectView | NewProjectView
export const Main: FC<Main> = (props) => {
  return (
    <div style={outerStyle}>
      {props.view === MainView.Project ? (
        <div style={projectStyle}>
          <props.ProjectComp />
        </div>
      ) : props.view === MainView.NewProject ? (
        <div style={projectStyle}>
          <props.NewProjectComp />
        </div>
      ) : null}
    </div>
  )
}
const outerStyle: CSSProperties = {
  height: '100%',
  width: '100%'
}
const projectStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  right: 0
}

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
        <props.ProjectComp />
      ) : props.view === MainView.NewProject ? (
        <props.NewProjectComp />
      ) : null}
    </div>
  )
}
const outerStyle: CSSProperties = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  right: 0,
  overflow: 'hidden'
}

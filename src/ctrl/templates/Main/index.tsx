import { NewProjectViewCtrl } from 'ctrl/Views/NewProject'
import React, { FC, useMemo } from 'react'
import { Main, MainView } from 'ui/templates/Main'
import { useStickeryState } from 'srv'
import { ProjectViewCtrl } from 'ctrl/Views/Project'

export interface MainCtrl {}
export const MainCtrl: FC<MainCtrl> = () => {
  const {
    project: { current }
  } = useStickeryState()
  const props = useMemo<Main>(() => {
    if (current) {
      return {
        ProjectComp: () => <ProjectViewCtrl />,
        view: MainView.Project
      }
    } else {
      return {
        NewProjectComp: () => <NewProjectViewCtrl />,
        view: MainView.NewProject
      }
    }
  }, [current])
  return <Main {...props} />
}

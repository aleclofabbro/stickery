import { NewProjectViewCtrl } from 'ui/Views/NewProject/NewProjectViewCtrl'
import React, { FC, useMemo } from 'react'
import { Main, MainView } from '.'
import { useStickeryState } from 'srv'
import { ProjectViewCtrl } from 'ui/Views/Project/ProjectViewCtrl'

export interface MainCtrl {}
export const MainCtrl: FC<MainCtrl> = () => {
  const { project } = useStickeryState()
  const props = useMemo<Main>(() => {
    if (project) {
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
  }, [project])
  return <Main {...props} />
}

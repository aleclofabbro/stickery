import { NewProjectViewCtrl } from 'ctrl/Views/NewProject'
import React, { FC, useMemo } from 'react'
import { Main, MainView } from 'ui/templates/Main'

export interface MainCtrl {}
export const MainCtrl: FC<MainCtrl> = () => {
  const props = useMemo<Main>(
    () => ({
      NewProjectComp: () => <NewProjectViewCtrl />,
      view: MainView.NewProject
    }),
    []
  )
  return <Main {...props} />
}

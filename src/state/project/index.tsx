import React, { useReducer, createContext, SFC, useContext } from 'react'
import { PrjReducer, ProjectState, Actions } from './types'
import { reducer } from './reducer'

const initialState: ProjectState = {
  background: null // '/_/images/1/xoxo.png'
}
export type ProjectStateCtx = { state: ProjectState; dispatch: React.Dispatch<Actions> }
export const ProjectStateCtx = createContext<ProjectStateCtx>({} as ProjectStateCtx)
export const useProjectState = () => useContext(ProjectStateCtx)

export interface Provide {}
export const ProvideProjectState: SFC<Provide> = ({ children }) => {
  const [state, dispatch] = useReducer<PrjReducer>(reducer, initialState)
  const value = { state, dispatch }
  return <ProjectStateCtx.Provider value={value}>{children}</ProjectStateCtx.Provider>
}

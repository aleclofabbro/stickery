import { actionCtx } from 'lib/Actions'
import { Reducer, useMemo, useReducer } from 'react'

export interface ProjectState {
  background: string | null
  objects: {}[]
}

export type PrjReducer = Reducer<ProjectState, any>

const act_setBackground = actionCtx<string>('setBackground')

const initialState: ProjectState = {
  background: null, // '/_/images/1/xoxo.png',
  objects: []
}
export const reducer: PrjReducer = (prev, action) =>
  act_setBackground.do(action, (background) => ({
    ...prev,
    background
  })) || prev

export const useProject = () => {
  const [state, dispatch] = useReducer<PrjReducer>(reducer, initialState)

  return useMemo(
    () => ({
      state,
      dispatch
    }),
    [dispatch, state]
  )
}

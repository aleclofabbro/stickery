import { actionCtx } from 'lib/Actions'
import { Reducer, useMemo, useReducer } from 'react'

export type ProjectObject = Object

export interface ProjectState {
  background: string | null
  objects: ProjectObject[]
}

export type PrjReducer = Reducer<ProjectState, any>

const cmd_prj_set_background = actionCtx<string>('cmd_prj_set_background')
const cmd_prj_add_object = actionCtx<ProjectObject>('cmd_prj_add_object')

const initialState: ProjectState = {
  background: null, // '/_/images/1/xoxo.png',
  objects: []
}
export const reducer: PrjReducer = (prev, action) =>
  cmd_prj_set_background.do(action, (background) => ({
    ...prev,
    background
  })) ||
  cmd_prj_add_object.do(action, (object) => ({
    ...prev,
    objects: [...prev.objects, object]
  })) ||
  prev

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

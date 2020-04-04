import { actionCtx } from 'lib/Actions'
import { Reducer, useMemo, useReducer } from 'react'
import { ProjectData } from 'srv/@types/data'

export type ProjectObject = Object

export interface ProjectWorkbench extends ProjectData {}
export type ProjectWorkbenchState = ProjectWorkbench | null

export type PrjReducer = Reducer<ProjectWorkbenchState | null, any>

const cmd_prj_set_background = actionCtx<string>('cmd_prj_set_background')
const cmd_prj_add_object = actionCtx<ProjectObject>('cmd_prj_add_object')

export const cmd_prj_new_project = actionCtx<Pick<ProjectData, 'name' | 'background'>>(
  'cmd_prj_new_project'
)

const initialState: ProjectWorkbenchState = null
export const reducer: PrjReducer = (prev, action) => {
  if (cmd_prj_new_project.is(action)) {
    return {
      ...action.payload,
      objects: []
    }
  }
  if (prev) {
    if (cmd_prj_set_background.is(action)) {
      return {
        ...prev,
        background: action.payload
      }
    }
    if (cmd_prj_add_object.is(action)) {
      return {
        ...prev,
        objects: [...prev.objects, action.payload]
      }
    }
  }
  return prev
}

export const useProjectWorkbench = () => {
  const [state, dispatch] = useReducer<PrjReducer>(reducer, initialState)

  return useMemo(
    () => ({
      state,
      dispatch
    }),
    [dispatch, state]
  )
}

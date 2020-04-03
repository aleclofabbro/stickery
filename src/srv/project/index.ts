import { actionCtx } from 'lib/Actions'
import { Reducer, useMemo, useReducer } from 'react'

export type ProjectObject = Object

export interface Project {
  name: string
  background: string
  objects: ProjectObject[]
}
export interface ProjectState {
  current: Project | null
}

export type PrjReducer = Reducer<ProjectState, any>

const cmd_prj_set_background = actionCtx<string>('cmd_prj_set_background')
const cmd_prj_add_object = actionCtx<ProjectObject>('cmd_prj_add_object')

export const cmd_prj_new_project = actionCtx<Pick<Project, 'name' | 'background'>>(
  'cmd_prj_new_project'
)

const initialState: ProjectState = {
  current: null
}
export const reducer: PrjReducer = (prev, action) => {
  if (cmd_prj_new_project.is(action)) {
    return {
      current: {
        ...action.payload,
        objects: []
      }
    }
  }
  if (prev.current) {
    if (cmd_prj_set_background.is(action)) {
      return {
        ...prev,
        current: {
          ...prev.current,
          background: action.payload
        }
      }
    }
    if (cmd_prj_add_object.is(action)) {
      return {
        ...prev,
        current: {
          ...prev.current,
          objects: [...prev.current.objects, action.payload]
        }
      }
    }
  }
  return prev
}

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

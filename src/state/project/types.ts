import { Reducer } from 'react'

export interface ProjectState {
  background: string | null
}

export type ActSetBackground = { t: 'bg'; p: string }
export type ActSetFoo = { t: 'foo'; p: number }
export type Actions = ActSetBackground | ActSetFoo
export type PrjReducer = Reducer<ProjectState, Actions>

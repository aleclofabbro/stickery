import { PrjReducer, ProjectState } from './types'
import { setter } from '../../lib/utils'
type S = ProjectState

export const reducer: PrjReducer = (prev, action) => {
  const next = _reducer(prev, action)
  console.log(next)
  return next
}
const _reducer: PrjReducer = (prev, action) => {
  switch (action.t) {
    case 'bg': {
      return setBackground(prev, action.p)
    }
  }
  return prev
}

export const setBackground = setter<S, 'background'>('background')

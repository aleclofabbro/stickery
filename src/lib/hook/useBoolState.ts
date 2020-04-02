import { useCallback, useState, useMemo } from 'react'

export const useBoolState = (initial = false) => {
  let [state, setState] = useState(initial)
  const toFalse = useCallback(() => setState(false), [])
  const toTrue = useCallback(() => setState(true), [])
  const toggle = useCallback(() => setState(!state), [state])
  return useMemo(() => ({ b: state, T: toTrue, F: toFalse, t: toggle, s: setState }), [
    state,
    toFalse,
    toTrue,
    toggle
  ])
}

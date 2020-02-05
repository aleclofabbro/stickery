import { useCallback, useState } from 'react'

export const useBoolState = (initial: boolean) => {
  let [state, setState] = useState(false)
  const toFalse = useCallback(() => setState(false), [])
  const toTrue = useCallback(() => setState(true), [])
  const toggle = useCallback(() => setState(!state), [state])
  return { b: state, T: toTrue, F: toFalse, t: toggle, s: setState }
}

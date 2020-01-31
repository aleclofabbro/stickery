import { useCallback, useState } from 'react'

export const useBoolState = (
  initial: boolean
): [boolean, () => unknown, () => unknown, () => unknown, (state: boolean) => unknown] => {
  let [state, setState] = useState(false)
  const toFalse = useCallback(() => setState(false), [])
  const toTrue = useCallback(() => setState(true), [])
  const toggle = useCallback(() => setState(!state), [state])
  return [state, toTrue, toFalse, toggle, setState]
}

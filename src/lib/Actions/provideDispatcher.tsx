import React, { createContext, FC, useContext, useMemo } from 'react'
import { Action, Dispatch } from '.'

export interface DispatcherCtx {
  dispatch: Dispatch<any>
}
export type Middleware = (action: Action<any>, dispatch: Dispatch<any>) => Action<any> | undefined
export interface ProvideMiddleware {
  mw: Middleware
}

export const DispatcherCtx = createContext<DispatcherCtx>({
  dispatch: (action) => {
    // console.log('DispatcherCtx', action)
    if (!action.handled) {
      console.warn('no handler for action', action, new Error())
    }
  }
})

export const useDispatcher = () => {
  return useContext(DispatcherCtx)
}

export const useMWProvider = (mw: Middleware): FC =>
  useMemo(() => ({ children }) => <ProvideMiddleware mw={mw}>{children}</ProvideMiddleware>, [mw])

export const ProvideMiddleware: FC<ProvideMiddleware> = ({ mw, children }) => {
  const parentDispatcher = useDispatcher()
  const providerDispatch = useMemo<DispatcherCtx>(() => {
    return {
      dispatch: (action) => {
        const prosecution = mw(action, parentDispatcher.dispatch)
        prosecution && parentDispatcher.dispatch(prosecution)
      }
    }
  }, [mw, parentDispatcher])
  return <DispatcherCtx.Provider value={providerDispatch}>{children}</DispatcherCtx.Provider>
}

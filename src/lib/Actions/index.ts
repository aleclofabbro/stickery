import { useCallback } from 'react'

export interface Action<P> {
  readonly payload: P
  readonly type: string
  readonly symbol: Symbol
  readonly handled: boolean
}
export type Dispatch<P> = (_: Action<P>) => unknown
interface ActionCtx<P> {
  (dispatch: Dispatch<P>): (payload: P) => Action<P>
  (payload: P): Action<P>
  do<T>(a: any, h: (_: P) => T): T | void
}
export const isDispatch = <P>(_: any): _ is Dispatch<P> => 'function' === typeof _
export const actionCtx = <P>(type: string): ActionCtx<P> => {
  const symbol = Symbol(`${type}`)

  const create = ((payload_or_dispatch: Dispatch<P> | P) => {
    if (isDispatch<P>(payload_or_dispatch)) {
      const dispatch = payload_or_dispatch
      return (payload: P) => {
        const action = create(payload)
        dispatch(action)
        return action
      }
    }

    const payload = payload_or_dispatch
    const newAction: Action<P> = {
      type,
      payload,
      symbol,
      handled: false
    }
    return newAction
  }) as ActionCtx<P>

  const _do: ActionCtx<P>['do'] = (_: Action<any>, handler) => {
    if (!!_ && 'symbol' in _ && _.symbol === symbol) {
      //@ts-ignore
      _.handled = true
      return handler(_.payload)
    }
  }
  create.do = _do

  return create
}

export const useActionDispatcher = <P>(actionCtx: ActionCtx<P>, dispatch: Dispatch<P>) =>
  useCallback((payload: P) => actionCtx(dispatch)(payload), [dispatch, actionCtx])

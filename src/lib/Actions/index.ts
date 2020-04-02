import { useCallback } from 'react'
import { useDispatcher } from './provideDispatcher'

export interface Action<P, R = void> {
  readonly payload: P
  readonly type: string
  readonly symbol: Symbol
  readonly handled: boolean
  readonly consumed: boolean
  readonly response: Promise<R>
  readonly deferred: { resolve(resp: R): void; reject(err: any): void }
  readonly notConsumedResponse: R
  readonly consumable: boolean
}
export type Dispatch<P, R> = (_: Action<P, R>) => unknown
interface ActionCtx<P, R = void> {
  (dispatch: Dispatch<P, R>): (payload: P) => Action<P, R>
  (payload: P): Action<P, R>
  do<T>(a: any, h: (_: P) => T): T | void
  is(a: any): a is Action<P, R>
  consume(a: any, h: (_: P) => R | Promise<R>): void
}
export const isDispatch = <P, R>(_: any): _ is Dispatch<P, R> => 'function' === typeof _
export const actionCtx = <P>(type: string): ActionCtx<P> => _commandCtx(type, undefined, false)
export const commandCtx = <P, R = void>(type: string, notConsumedResponse: R): ActionCtx<P, R> =>
  _commandCtx(type, notConsumedResponse, true)
export const _commandCtx = <P, R = void>(
  type: string,
  notConsumedResponse: R,
  consumable: boolean
): ActionCtx<P, R> => {
  const symbol = Symbol(`${type}`)

  const create = ((payload_or_dispatch: Dispatch<P, R> | P) => {
    if (isDispatch<P, R>(payload_or_dispatch)) {
      const dispatch = payload_or_dispatch
      return (payload: P) => {
        const action = create(payload)
        dispatch(action)
        return action
      }
    }

    const payload = payload_or_dispatch

    const deferred: { resolve(resp: R): void; reject(err: any): void } = {
      resolve: () => {},
      reject: () => {}
    }
    const response = new Promise<R>((resolve, reject) => {
      deferred.reject = reject
      deferred.resolve = resolve
    })

    const newAction: Action<P, R> = {
      type,
      payload,
      symbol,
      handled: false,
      consumed: false,
      response,
      deferred,
      notConsumedResponse,
      consumable
    }
    return newAction
  }) as ActionCtx<P, R>

  const is = (_: any): _ is Action<P, R> => !!_ && 'symbol' in _ && _.symbol === symbol
  create.is = is

  const _do: ActionCtx<P, R>['do'] = (_: Action<any, any>, handler) => {
    if (is(_)) {
      //@ts-ignore
      _.handled = true
      return handler(_.payload)
    }
  }
  create.do = _do

  const consume: ActionCtx<P, R>['consume'] = async (_: Action<any, any>, handler) => {
    if (consumable && is(_)) {
      if (_.consumed) {
        console.error(_, new Error(`Action already consumed!`))
        return
      }
      //@ts-ignore
      _.consumed = true
      //@ts-ignore
      _.handled = true
      const resp = await Promise.resolve(handler(_.payload))
      _.deferred.resolve(resp)
    }
  }
  create.consume = consume

  return create
}

export const useActionCustDispatch = <P, R>(
  actionCtx: ActionCtx<P, R>,
  dispatch: Dispatch<P, R>
) => {
  return useCallback(
    (payload: P) => {
      return actionCtx(dispatch)(payload)
    },
    [dispatch, actionCtx]
  )
}
export const useActionDispatch = <P, R>(actionCtx: ActionCtx<P, R>) => {
  const { dispatch } = useDispatcher()
  return useActionCustDispatch(actionCtx, dispatch)
}

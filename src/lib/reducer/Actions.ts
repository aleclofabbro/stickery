interface Action<P> {
  payload: P
  symbol: Symbol
}
type Dispatch<P> = (_: Action<P>) => unknown
interface ActionCtx<P> {
  (dispatch: Dispatch<P>): (payload: P) => Action<P>
  (payload: P): Action<P>
  do<T>(a: any, h: (_: P) => T): T | undefined
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
    return {
      payload,
      symbol
    }
  }) as ActionCtx<P>

  const _do: ActionCtx<P>['do'] = (_: any, handler) =>
    !!_ && 'symbol' in _ && _.symbol === symbol ? handler(_.payload) : undefined

  create.do = _do

  return create
}

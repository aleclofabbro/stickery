import { useMemo } from 'react'

export type Service<S> = { state: S; dispatch: (_: any) => unknown }
type Services = {
  [T: string]: Service<any>
}
export type StateOf<Srv extends Service<any>> = Srv['state']
export type State<Svcs extends Services> = {
  [K in keyof Svcs]: StateOf<Svcs[K]>
}
export const useServices = <S extends Services>(
  srvcs: S
): {
  state: State<S>
  dispatch: (_: any) => unknown
} => {
  return useMemo(() => {
    const keys = Object.keys(srvcs)

    const dispatch = keys.reduce(
      (red, key) => (_: any) => {
        srvcs[key].dispatch(_)
        red(_)
      },
      (_: any) => {}
    )
    const state: State<S> = keys.reduce(
      (red, key) => ({
        ...red,
        [key]: srvcs[key].state
      }),
      {} as State<S>
    )

    return {
      state,
      dispatch
    }
  }, [srvcs])
}

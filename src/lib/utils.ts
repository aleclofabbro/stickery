export type Setter<S, K extends keyof S> = (key: K) => (state: S, v: S[K]) => S
export const setter = <S, K extends keyof S>(k: K) => (state: S, v: S[K]): S => ({
  ...state,
  [k]: v
})

import { useEffect, useMemo } from 'react'

export const useNavStack = (onBack: () => unknown) => {
  useEffect(() => {
    window.history.pushState({}, '')
    const _onBack = () => {
      onBack()
    }
    window.addEventListener('popstate', _onBack)
    return () => {
      window.removeEventListener('popstate', _onBack)
      // window.history.back()
    }
  }, [onBack])
  return useMemo(() => {
    return {
      back: () => {
        window.history.back()
      }
    }
  }, [])
}

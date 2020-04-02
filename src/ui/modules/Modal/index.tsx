import React, { CSSProperties, FC, useRef, useEffect, useCallback } from 'react'
import { useNavStack } from '../../../lib/hook/useNavStack'

export interface Modal {
  onClickOut(): unknown
}
export const Modal: FC<Modal> = ({ onClickOut, children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const div = ref.current
      const parent = ref.current.parentElement
      document.body.appendChild(div)
      return () => {
        parent && parent.appendChild(div)
      }
    }
  }, [])
  const { back } = useNavStack(onClickOut)
  const bgClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      if (ev.target !== ev.currentTarget) {
        return
      } else {
        back()
        onClickOut() //FIXME: si può togliere ? back() richiama anche onClickOut()?
      }
    },
    [onClickOut, back]
  )

  return (
    <div id="modal" ref={ref} style={bgStyle} onClick={bgClick}>
      <div style={modalStyle}>{children}</div>
    </div>
  )
}
const modalStyle: CSSProperties = {
  position: 'fixed',
  left: '5%',
  top: '5%',
  right: '5%',
  bottom: '5%',
  backgroundColor: '#1a1a1a'
}
const bgStyle: CSSProperties = {
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)'
}

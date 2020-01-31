import React, { CSSProperties, SFC, useRef, useEffect, useCallback } from 'react'

export interface Modal {
  clickOut(): unknown
}
export const Modal: SFC<Modal> = ({ clickOut, children }) => {
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
  const bgClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement>) => {
      if (ev.target !== ev.currentTarget) {
        return
      } else {
        clickOut()
      }
    },
    [clickOut]
  )
  return (
    <div id="modal" ref={ref} style={bgStyle} onClick={bgClick}>
      <div style={modalStyle}>{children}</div>
    </div>
  )
}
const modalStyle: CSSProperties = {
  position: 'fixed',
  left: '20%',
  top: '20%',
  right: '20%',
  bottom: '20%',
  backgroundColor: 'gray'
}
const bgStyle: CSSProperties = {
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)'
}

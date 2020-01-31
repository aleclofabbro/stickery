import React, { CSSProperties, SFC } from 'react'

export interface Modal {
  close(): any
}
export const Modal: SFC<Modal> = ({ close, children }) => {
  return (
    <>
      <div style={bgStyle} onClick={close}></div>
      <div style={modalStyle}>{children}</div>
    </>
  )
}
const modalStyle: CSSProperties = {
  position: 'fixed',
  left: '20%',
  top: '20%',
  right: '20%',
  bottom: '20%'
}
const bgStyle: CSSProperties = {
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0,2)'
}

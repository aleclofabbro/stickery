import React, { FC, CSSProperties } from 'react'

export type Button = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button: FC<Button & Button> = (props) => {
  return <button {...props}>{props.children}</button>
}

export const btnStyle: CSSProperties = {
  float: 'left',
  backgroundColor: 'gray'
}

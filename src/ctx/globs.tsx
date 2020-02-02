import React, { SFC } from 'react'
import { ProvideProjectState } from '../state/project'

export const GlobCtx: SFC = ({ children }) => {
  return <ProvideProjectState>{children}</ProvideProjectState>
}

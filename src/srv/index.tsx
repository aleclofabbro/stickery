import React, { FC, createContext, useContext } from 'react'
import { useProject } from 'srv/project'
import { useImageDb } from 'srv/db'
import { useServices } from 'lib/hook/useServices'

export type StickeryServices = ReturnType<typeof useCreateStickeryServices>
export const useCreateStickeryServices = () => {
  return useServices({
    project: useProject(),
    imageDB: useImageDb()
  })
}

export type StickeryServicesCtx = StickeryServices
export const StickeryServicesCtx = createContext<StickeryServicesCtx | null>(null)

export interface ProvideStickeryServices {
  srvcs: StickeryServices
}
export const ProvideStickeryServices: FC<ProvideStickeryServices> = ({ srvcs, children }) => {
  return <StickeryServicesCtx.Provider value={srvcs}>{children}</StickeryServicesCtx.Provider>
}

export const useStickeryState = () => {
  const srvcs = useContext(StickeryServicesCtx)
  if (!srvcs) {
    throw new Error('no StickeryServicesCtx')
  }
  return srvcs.state
}

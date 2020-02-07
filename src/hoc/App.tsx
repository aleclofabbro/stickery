import React, { SFC, useMemo } from 'react'
import { MainTpl } from '../ui/templates/Main'
import { SetBgButtonHoc } from './modules/top-bar/SetBgButtonHoc'
import { MainCanvasHoc } from './canvas/MainCanvasHoc'
import { FabricCanvasCtxProvider } from '../srv/fabric/canvas'

export const App: SFC = () => {
  const mainProps = useMemo<MainTpl>(() => {
    return {
      TopBar: (
        <>
          <SetBgButtonHoc />
        </>
      ),
      Canvas: <MainCanvasHoc />
    }
  }, [])

  return (
    <FabricCanvasCtxProvider setState={console.log}>
      <MainTpl {...mainProps}></MainTpl>
    </FabricCanvasCtxProvider>
  )
}

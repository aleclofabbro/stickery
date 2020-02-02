import React, { SFC, useMemo } from 'react'
import { MainTpl } from '../ui/templates/Main'
import { SetBgButtonHoc } from './modules/top-bar/SetBgButtonHoc'
import { MainCanvasHoc } from './canvas/MainCanvasHoc'

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

  return <MainTpl {...mainProps}></MainTpl>
}

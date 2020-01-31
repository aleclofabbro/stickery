import React, { SFC, useMemo } from 'react'
import { MainTpl } from '../ui/templates/Main'
import { SetBgButtonHoc } from './modules/top-bar/SetBgButtonHoc'

export const App: SFC = () => {
  const mainProps = useMemo<MainTpl>(() => {
    return {
      TopBar: (
        <>
          <SetBgButtonHoc />
        </>
      ),
      Canvas: <div>canvas</div>
    }
  }, [])

  return <MainTpl {...mainProps}></MainTpl>
}

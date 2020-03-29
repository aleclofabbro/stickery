import React, { CSSProperties, SFC } from 'react'
import { ImageGallery, act_clickImage } from 'ui/modules/Gallery'
import { ProvideMiddleware, Middleware } from 'lib/Actions/provideDispatcher'

export interface MainTpl {}
export const MainTpl: SFC<MainTpl> = () => {
  const galleryMW: Middleware = (action) => {
    act_clickImage.do(action, (meta) => console.log('clickedMeta', meta))
    return action
  }
  return (
    <div style={outerStyle}>
      <div style={canvasStyle}>
        <ProvideMiddleware mw={galleryMW}>
          <ImageGallery />
        </ProvideMiddleware>
      </div>
    </div>
  )
}
const outerStyle: CSSProperties = {
  display: 'grid',
  gridTemplate: `
    "canvas" auto
  `
}
const canvasStyle: CSSProperties = {
  gridArea: 'canvas',
  backgroundColor: '#1a1a1a'
}

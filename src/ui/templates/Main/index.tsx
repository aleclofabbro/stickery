import React, { CSSProperties, SFC, useCallback } from 'react'
import { ImageGallery } from 'ui/modules/Gallery'
import { useMWProvider } from 'lib/Actions/provideDispatcher'
import { cmd_gallery_image_clicked } from 'ui/modules/Gallery/useGalleryProps'

export interface MainTpl {}
export const MainTpl: SFC<MainTpl> = () => {
  const GalleryMWProvider = useMWProvider(
    useCallback((action) => {
      cmd_gallery_image_clicked.do(action, (meta) => console.log('clickedMeta', meta))
      return action
    }, [])
  )
  return (
    <div style={outerStyle}>
      <div style={canvasStyle}>
        <GalleryMWProvider>
          <ImageGallery />
        </GalleryMWProvider>
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

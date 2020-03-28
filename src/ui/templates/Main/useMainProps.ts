import { useMemo } from 'react'
import { StickeryServices } from 'srv'
import { MainTpl } from '.'
import { act_importImage } from 'srv/db'

export const useMainProps = (srvcs: StickeryServices): MainTpl => {
  return useMemo<MainTpl>(() => {
    const { dispatch, state } = srvcs

    return {
      imageGalleryProps: {
        images: state.imageDB.images,
        add: act_importImage(dispatch),
        onClickImage: console.log
      }
    }
  }, [srvcs])
}

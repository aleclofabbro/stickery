import React, { SFC, useCallback, useMemo } from 'react'
import { useBoolState } from '../../../lib/hook/useBoolState'
import { ImageMeta } from '../../../srv/db'
import { SetBgButton } from '../../../ui/modules/top-bar/SetBgButton'
import { ImportedImageGalleryHOC } from '../importedImageGallery/ImportedImageGalleryHOC'
import { useCanvasCtrl } from '../../../srv/fabric/canvas'

export const SetBgButtonHoc: SFC = () => {
  const { b: isModalOpen, T: openModal, F: closeModal } = useBoolState(false)
  const mainCanvasCtrl = useCanvasCtrl()
  const imageSelected = useCallback(
    (meta: ImageMeta) => {
      if (!mainCanvasCtrl) {
        return
      }
      mainCanvasCtrl.setBackground(meta.src)
      closeModal()
    },
    [closeModal, mainCanvasCtrl]
  )
  const Gallery = useMemo(() => <ImportedImageGalleryHOC onClickImage={imageSelected} />, [
    imageSelected
  ])

  return (
    <SetBgButton
      closeModal={closeModal}
      isModalOpen={isModalOpen}
      openModal={openModal}
      Gallery={Gallery}
    />
  )
}

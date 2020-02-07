import React, { SFC, useCallback, useMemo } from 'react'
import { useBoolState } from '../../../lib/hook/useBoolState'
import { ImageMeta } from '../../../srv/db'
import { useProjectState } from '../../../state/project'
import { AddStickerButton } from '../../../ui/modules/top-bar/AddStickerButton'
import { ImportedImageGalleryHOC } from '../importedImageGallery/ImportedImageGalleryHOC'

export const AddStickerButtonHoc: SFC = () => {
  const { dispatch } = useProjectState()
  const { b: isModalOpen, T: openModal, F: closeModal } = useBoolState(false)
  const imageSelected = useCallback(
    (meta: ImageMeta) => {
      dispatch({ t: 'bg', p: meta.src })
      closeModal()
    },
    [closeModal, dispatch]
  )

  const Gallery = useMemo(() => <ImportedImageGalleryHOC onClickImage={imageSelected} />, [
    imageSelected
  ])

  return (
    <AddStickerButton
      closeModal={closeModal}
      isModalOpen={isModalOpen}
      openModal={openModal}
      Gallery={Gallery}
    />
  )
}

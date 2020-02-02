import React, { SFC, useCallback } from 'react'
import { useFileChooser } from '../../../hook/fileChooser'
import { useBoolState } from '../../../hook/useBoolState'
import { SetBgButton } from '../../../ui/modules/top-bar/SetBgButton'
import { importImage } from '../../../srv/importImage'
import { useProjectState } from '../../../state/project'

export const SetBgButtonHoc: SFC = () => {
  const [isModalOpen, openModal, closeModal] = useBoolState(false)
  const { dispatch } = useProjectState()
  const getBgFile = useCallback(
    (file: File) => {
      importImage(file).then((url) => dispatch({ t: 'bg', p: url }))
    },
    [dispatch]
  )
  const [importFile] = useFileChooser({ fileChoosen: getBgFile })
  return (
    <SetBgButton
      importFile={importFile}
      closeModal={closeModal}
      isModalOpen={isModalOpen}
      openModal={openModal}
    />
  )
}

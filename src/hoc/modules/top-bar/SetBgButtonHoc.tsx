import React, { SFC, useCallback } from 'react'
import { useFileChooser } from '../../../hook/fileChooser'
import { useBoolState } from '../../../hook/useBoolState'
import { SetBgButton } from '../../../ui/modules/top-bar/SetBgButton'

export const SetBgButtonHoc: SFC = () => {
  const [isModalOpen, openModal, closeModal] = useBoolState(false)
  const getBgFile = useCallback((file: File) => {
    alert(`
${file.name}
${file.type}
${file.size}
${file.lastModified}
`)
  }, [])
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

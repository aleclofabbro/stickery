import React, { SFC, useCallback, useState } from 'react'
import { useFileChooser } from '../../../hook/fileChooser'
import { SetBgButton } from '../../../ui/modules/top-bar/SetBgButton'

export const SetBgButtonHoc: SFC = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const closeModal = useCallback(() => setModalOpen(false), [])
  const openModal = useCallback(() => setModalOpen(true), [])

  const getBgFile = useCallback((file: File) => {
    console.log(file)
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

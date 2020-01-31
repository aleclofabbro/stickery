import React, { SFC } from 'react'
import { TopBarButton } from '../../elements/top-bar/Button'
import { Modal } from '../Modal/Modal'

export interface SetBgButton {
  isModalOpen: boolean
  openModal(): unknown
  closeModal(): unknown
  importFile(): unknown
}

export const SetBgButton: SFC<SetBgButton> = ({
  closeModal,
  isModalOpen,
  openModal,
  importFile
}) => {
  return (
    <>
      <TopBarButton onClick={openModal}>Sfondo</TopBarButton>
      {isModalOpen && (
        <Modal clickOut={closeModal}>
          <button onClick={importFile}>scegli file</button>
          <br />
          <span>o incolla</span>
        </Modal>
      )}
    </>
  )
}

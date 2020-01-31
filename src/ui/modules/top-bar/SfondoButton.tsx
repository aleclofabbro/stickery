import React, { SFC } from 'react'
import { TopBarButton } from '../../elements/top-bar/Button'
import { Modal } from '../Modal/Modal'

export interface SetBgButton {
  isModalOpen: boolean
  openModal(): any
  closeModal(): any
  chooseFile(): any
  pasteFile(): any
}

export const SetBgButton: SFC<SetBgButton> = ({ closeModal, isModalOpen, openModal }) => {
  return (
    <>
      <TopBarButton onClick={openModal}>Sfondo</TopBarButton>
      {isModalOpen && (
        <Modal close={closeModal}>
          <button>scegli file</button>
          <br />
          <span>o incolla</span>
        </Modal>
      )}
    </>
  )
}

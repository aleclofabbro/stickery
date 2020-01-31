import React, { SFC } from 'react'
import { TopBarButton } from '../../elements/top-bar/Button'
import { Modal } from '../Modal/Modal'
import { Button } from '../../elements/basic/Button'

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
        <Modal onClickOut={closeModal}>
          <Button onClick={importFile}>scegli file</Button>
          <br />
          <span>o incolla</span>
        </Modal>
      )}
    </>
  )
}

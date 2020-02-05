import React, { SFC } from 'react'
import { TopBarButton } from '../../elements/top-bar/Button'
import { Modal } from '../Modal/Modal'

export interface SetBgButton {
  isModalOpen: boolean
  openModal(): unknown
  closeModal(): unknown
  Gallery: JSX.Element
}

export const SetBgButton: SFC<SetBgButton> = ({
  closeModal,
  isModalOpen,
  openModal,

  Gallery
}) => {
  return (
    <>
      <TopBarButton onClick={openModal}>Sfondo</TopBarButton>
      {isModalOpen && <Modal onClickOut={closeModal}>{Gallery}</Modal>}
    </>
  )
}

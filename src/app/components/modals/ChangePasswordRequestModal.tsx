import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import CreateRequestToChangePassword from '../login/forgot-password-modal/CreateRequestToChangePassword'

export default function ChangePasswordRequestModal({ isOpen, onClose, event }: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateRequestToChangePassword onCloseModal={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

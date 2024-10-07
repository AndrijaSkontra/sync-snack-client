"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import EditProfileForm from "./EditProfileForm";

export default function EditProfileModal({
  isOpen,
  onClose,
  setProfilePicture,
  session,
}: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change profile image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditProfileForm
            setProfilePicture={setProfilePicture}
            onClose={onClose}
            session={session}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

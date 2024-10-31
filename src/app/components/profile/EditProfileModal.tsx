// EditProfileModal.tsx
"use client";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import EditProfileForm from "./EditProfileForm";

export default function EditProfileModal({ isOpen, onClose, setProfilePicture, setFirstName, setLastName, session }: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EditProfileForm
            onClose={onClose}
            setProfilePicture={setProfilePicture}
            setFirstName={setFirstName}
            setLastName={setLastName}
            session={session}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import DragAndDropProfilePicture from "./DragAndDropProfilePicture";

export default function EditProfileModal({
  isOpen,
  onClose,
  setProfilePicture,
}: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change profile image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <DragAndDropProfilePicture
            setProfilePicture={setProfilePicture}
            onClose={onClose}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="xred" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

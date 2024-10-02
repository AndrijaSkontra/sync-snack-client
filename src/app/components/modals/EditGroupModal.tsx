"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import EditGroupForm from "../forms/EditGroupForm";

export default function EditGroupModal({
  isOpen,
  onClose,
  session,
  setReload,
}: any) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditGroupForm
              session={session}
              onClose={onClose}
              setReload={setReload}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

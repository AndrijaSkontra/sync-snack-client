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
import CreateOrderForm from "../forms/CreateOrderForm";

export default function CreateOrderModal({ isOpen, onClose, event }: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateOrderForm event={event} onCloseModal={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

"use client";
import { Box, Button, Divider, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import CreateEventForm from "../forms/CreateEventForm";
import { Suspense, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

/**
 * This component is responsible for displaying
 * the Modal(create event) when button is clicked.
 * The button won't be displayed if the user already has
 * an active event.
 */
export default function CreateEventButtonModal() {
  const t = useTranslations("Group events page");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userHasEvent, setUserHasEvent] = useState(false);
  const { data: session, status }: any = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/active`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
          groupId: `${localStorage.getItem("GroupId")}`,
        },
      })
        .then((res) => res.json())
        .then(() => {
          setUserHasEvent(true);
        })
        .catch((e) => console.log());
    }
  }, [status, isOpen]);

  return (
    <Box className="flex justify-center">
      {!userHasEvent ? (
        <Button colorScheme="xblue" onClick={onOpen}>
          {t("Create event")}
        </Button>
      ) : (
        <Text>You have an ongoing event already...</Text>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="1000px">
          <ModalHeader>Create event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Suspense fallback={<p>loading...</p>}>
              <CreateEventForm onCloseModal={onClose} />
            </Suspense>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

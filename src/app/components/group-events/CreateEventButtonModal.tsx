"use client";
import {
  Box,
  Button,
  Divider,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
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
import eventInProgressLight from "@/../public/you-are-brewing-coffee.json";
import eventInProgressDark from "@/../public/coffeEventInProgressDark.json";
import Lottie from "lottie-react";

/**
 * This component is responsible for displaying
 * the Modal(create event) when button is clicked.
 * The button won't be displayed if the user already has
 * an active event.
 */
export default function CreateEventButtonModal({ activeEvent }: any) {
  const t = useTranslations("Group events page");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userHasEvent, setUserHasEvent] = useState(false);
  const { data: session, status }: any = useSession();
  const { colorMode } = useColorMode();
  const animationData =
    colorMode === "light" ? eventInProgressLight : eventInProgressDark;
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

  if (activeEvent) {
    return (
      <Box className="text-center">
        <Box className="w-32 h-32 mx-auto">
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Text className="mt-2 text-base font-semibold">
          You have an ongoing event
        </Text>
      </Box>
    );
  }

  return (
    <Box className="flex justify-center">
      {!userHasEvent ? (
        <Button colorScheme="xblue" onClick={onOpen}>
          {t("Create event")}
        </Button>
      ) : (
        <Box className="text-center">
          <Box className="w-32 h-32 mx-auto">
            <Lottie
              animationData={animationData}
              loop={true}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <Text className="mt-2 text-base font-medium ">
            You have an ongoing event
          </Text>
        </Box>
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

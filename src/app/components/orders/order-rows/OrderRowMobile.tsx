"use client";
import { Tr, Td, Button, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import OrderTypePretty from "../order-type-preatty/OrderTypePretty";
import StatusPretty from "../status-preatty/StatusPretty";
import RatingPretty from "../rating-preatty/RatingPretty";
import OrderRateModalComponent from "../order-modal-component/OrderRateModalComponent";
import { useTranslations } from "next-intl";
import { formatDate } from "@/commons/formatDate";
import { useDisclosure } from "@chakra-ui/react";

export default function OrderRowMobile({ order, accessToken }: any) {
  const t = useTranslations("OrdersPage");
  const [orderRating, setOrderRating] = useState(order.rating);
  const boxShadowColor = useColorModeValue("xorange.400", "xorange.600");
  const textColor = useColorModeValue("gray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDesc,
    onOpen: onOpenDesc,
    onClose: onCloseDesc,
  } = useDisclosure();

  return (
    <>
      <Box
        className="bg-red-300 p-30 dark:bg-gray-800 p-6 mb-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
        borderRadius="lg"
      >
        <Box className="flex justify-between items-center">
          <Text
            className="font-semibold text-2xl"
            color={textColor}
            fontFamily="heading"
          >
            <OrderTypePretty orderType={order.eventType} />
          </Text>
          <Text
            className="text-sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            {formatDate(order.createdAt)}
          </Text>
        </Box>

        <Box className="mt-4">
          <StatusPretty statusType={order.status} />
        </Box>

        <Text
          className="mt-4 text-lg leading-relaxed"
          color={useColorModeValue("gray.800", "gray.300")}
          fontFamily="body"
          onClick={onOpenDesc}
        >
          {order.additionalOptions?.orderDetails
            ? JSON.stringify(order.additionalOptions.orderDetails).slice(
                0,
                16,
              ) + "..."
            : JSON.stringify(order.additionalOptions.description).slice(0, 13) +
              "..."}
        </Text>
        <Box className="mt-4 flex justify-center">
          {orderRating ? (
            <RatingPretty rating={orderRating} />
          ) : (
            <Button
              colorScheme="xorange"
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
            >
              {t("RateButton")}
            </Button>
          )}
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rate Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <OrderRateModalComponent
              setRating={setOrderRating}
              accessToken={accessToken}
              coffeeOrderId={order.orderId}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenDesc} onClose={onCloseDesc}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box className="p-6">
              {order.additionalOptions?.orderDetails
                ? JSON.stringify(order.additionalOptions.orderDetails)
                : JSON.stringify(order.additionalOptions.description)}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

"use client";
import { Tr, Td, Button, Box, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OrderTypePretty from "../order-type-preatty/OrderTypePretty";
import StatusPretty from "../status-preatty/StatusPretty";
import RatingPretty from "../rating-preatty/RatingPretty";
import OrderRateModalComponent from "../order-modal-component/OrderRateModalComponent";
import OrderDescriptionModalComponent from "../order-modal-component/OrderDescriptionModalComponent";
import { formatDate } from "@/commons/formatDate";
import { useTranslations } from "next-intl";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function OrderRow({ order, accessToken }: any) {
  const t = useTranslations("OrdersPage");
  const [isRateModalOpened, setRateModalOpen] = useState(false);
  const [isDescriptionModalOpened, setDescriptionModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [orderRating, setOrderRating] = useState(order.rating);

  useEffect(() => {
    setOrderRating(order.rating);
  }, [order.rating]);

  const handleDescriptionCloseModal = () => {
    setDescriptionModalOpen(false);
  };

  function DescriptionBox({ desc }: { desc: string }) {
    if (desc.length > 11) {
      desc = `${desc.slice(0, 9)}...`;
      return (
        <Box className="flex">
          <Text
            className="cursor-pointer hover:text-orange-dark-1"
            onClick={() => setDescriptionModalOpen(true)}
          >
            {desc}
          </Text>
        </Box>
      );
    } else {
      return <Text>{desc}</Text>;
    }
  }

  return (
    <>
      <Tr>
        <Td>{order.eventType}</Td>
        <Td className="w-96 font-semibold">{formatDate(order.createdAt)}</Td>
        <Td>
          <Box className="flex">
            <StatusPretty statusType={order.status} />
          </Box>
        </Td>
        <Td className="font-semibold">
          <DescriptionBox desc={order.additionalOptions.description} />
        </Td>
        <Td>
          {order.status === "COMPLETED" ? (
            <Box className="h-10 flex items-center">
              {orderRating !== 0 ? (
                <RatingPretty
                  desc={order.additionalOptions.description}
                  rating={orderRating}
                />
              ) : (
                <Button onClick={onOpen}>{t("RateButton")}</Button>
              )}
            </Box>
          ) : order.status === "IN_PROGRESS" ? (
            <Box className="h-10 flex items-center">
              <Text className="text-orange-light-1">{t("Cant-rate-yet")}</Text>
            </Box>
          ) : order.status === "CANCELLED" ? (
            <Box className="h-10 flex items-center">
              <Text className="text-orange-dark-2">{t("Cant-rate")}</Text>
            </Box>
          ) : null}
        </Td>
      </Tr>
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

      {isDescriptionModalOpened && (
        <Modal
          isOpen={isDescriptionModalOpened}
          onClose={handleDescriptionCloseModal}
        >
          <OrderDescriptionModalComponent
            description={order.additionalOptions.description}
            onClose={handleDescriptionCloseModal}
          ></OrderDescriptionModalComponent>
        </Modal>
      )}
    </>
  );
}

function objectToString(obj: any): string {
  if (typeof obj !== "object" || obj === null) {
    return String(obj);
  }

  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return `${key}:\n${objectToString(value)
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n")}`;
      }
      return `${key}: ${value}`;
    })
    .join("\n");
}

import { Tr, Td, Button, Box, Text, useDisclosure, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import OrderTypePretty from "../order-type-preatty/OrderTypePretty";
import StatusPretty from "../status-preatty/StatusPretty";
import RatingPretty from "../rating-preatty/RatingPretty";
import OrderRateModalComponent from "../order-modal-component/OrderRateModalComponent";
import { formatDate } from "@/commons/formatDate";
import { useTranslations } from "next-intl";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function OrderRow({ order, accessToken }: any) {
  const t = useTranslations("OrdersPage");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderRating, setOrderRating] = useState(order.rating);

  useEffect(() => {
    setOrderRating(order.rating);
  }, [order.rating]);

  const truncateDescription = (desc: string) =>
    desc.length > 50 ? `${desc.slice(0, 47)}...` : desc;

  return (
    <>
      <Tr>
        <Td>
          <OrderTypePretty orderType={order.eventType} />
        </Td>
        <Td className="w-96 font-semibold">{formatDate(order.createdAt)}</Td>
        <Td>
          <Box className="flex">
            <StatusPretty statusType={order.status} />
          </Box>
        </Td>
        <Td className="font-semibold">
          <Tooltip label={order.additionalOptions.description} hasArrow>
            <Text cursor="pointer">
              {truncateDescription(order.additionalOptions.description)}
            </Text>
          </Tooltip>
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
    </>
  );
}

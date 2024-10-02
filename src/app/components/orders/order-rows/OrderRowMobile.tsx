"use client";
import { Tr, Td, Button, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import Modal from "../../modals/Modal";
import OrderTypePretty from "../order-type-preatty/OrderTypePretty";
import StatusPretty from "../status-preatty/StatusPretty";
import RatingPretty from "../rating-preatty/RatingPretty";
import OrderRateModalComponent from "../order-modal-component/OrderRateModalComponent";
import { useTranslations } from "next-intl";
import { formatDate } from "@/commons/formatDate";

export default function OrderRowMobile({ order, accessToken }: any) {

  const t = useTranslations('OrdersPage');
  const [isRateModalOpened, setRateModalOpen] = useState(false);
  const [isDescriptionModalOpened, setDescriptionModalOpen] = useState(false);
  const [orderRating, setOrderRating] = useState(order.rating);

  const handleRateCloseModal = () => {
    setRateModalOpen(false);
  };

  

  const bgGradient = useColorModeValue(
    "linear(to-r, white.200, white.400)",
    "linear(to-r, gray.700, gray.900)"
  );
  const boxShadowColor = useColorModeValue("xorange.400", "xorange.600");
  const textColor = useColorModeValue("gray.900", "white");

  return (
    <>
      <Box
        className="p-6 mb-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
        bgGradient={bgGradient}
        boxShadow={`0 6px 20px ${boxShadowColor}`}
        borderRadius="lg"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: `0 8px 25px ${boxShadowColor}`,
        }}
        onClick={() => setDescriptionModalOpen(true)}
      >
        <Box className="flex justify-between items-center">
          <Text
            className="font-semibold text-2xl"
            color={textColor}
            fontFamily="heading"
          >
            <OrderTypePretty orderType={order.eventType} />
          </Text>
          <Text color={useColorModeValue("gray.600", "gray.400")}>
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
        >
          {order.additionalOptions?.orderDetails
            ? JSON.stringify(order.additionalOptions.orderDetails)
            : JSON.stringify(order.additionalOptions.description)}
        </Text>

        <Box className="mt-4 flex justify-end">
          {orderRating ? (
            <RatingPretty rating={orderRating} />
          ) : (
            <Button
              colorScheme="yellow"
              size="md"
              variant="solid"
              onClick={(e) => {
                e.stopPropagation();
                setRateModalOpen(true);
              }}
              fontFamily="heading"
            >
              {t('RateButton')}
            </Button>
          )}
        </Box>
      </Box>

      {isRateModalOpened && (
        <Modal isOpen={isRateModalOpened} onClose={handleRateCloseModal}>
          <OrderRateModalComponent
            setRating={setOrderRating}
            accessToken={accessToken}
            coffeeOrderId={order.orderId}
            onClose={handleRateCloseModal}
          />
        </Modal>
      )}

      
    </>
  );
}



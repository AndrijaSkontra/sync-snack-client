"use client";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
  HStack,
  IconButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { calculateOrderSizeBasedOnScreenHeight } from "@/commons/screen";
import OrderRow from "../order-rows/OrderRow";
import OrderRowMobile from "../order-rows/OrderRowMobile";
import { useTranslations } from "next-intl";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function OrdersTable({
  orders,
  accessToken,
  currentPage,
  setCurrentPage,
  isFilterApplied,
}: {
  orders: any[];
  accessToken: any;
  currentPage: number;
  setCurrentPage: any;
  isFilterApplied: any;
}) {
  const t = useTranslations("OrdersPage");

  if (orders.length === 0 && !isFilterApplied) {
    return (
      <Box className="flex justify-center items-center p-10">
        <Box className="rounded-xl border-2 border-black dark:border-white px-10 py-4 min-w-[60%] flex justify-center items-center flex-col">
          <FaceFrownIcon className="max-w-32 max-h-32" />
          <Text>So empty here...</Text>
          <Text className="text-center mt-4">
            How about starting with some orders?
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="md:hidden sm:flex flex-col h-full">
        <Box className="p-4 flex-none">
          {orders.map((order: any, index: number) => (
            <OrderRowMobile
              accessToken={accessToken}
              key={index}
              order={order}
            />
          ))}
        </Box>
        <Flex
          justifyContent="flex-end"
          alignItems="flex-end"
          mt={4}
          className="mr-4 mb-2 grow"
        >
          <HStack spacing={2}>
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              isDisabled={currentPage === 0}
              size="sm"
            />
            <IconButton
              aria-label="Next page"
              icon={<ChevronRightIcon />}
              onClick={() => setCurrentPage(currentPage + 1)}
              size="sm"
              isDisabled={
                orders.length < calculateOrderSizeBasedOnScreenHeight()
              }
            />
          </HStack>
        </Flex>
      </Box>
      <Box className="hidden md:flex flex-col grow">
        <Box className="p-4 flex-none">
          <TableContainer>
            <Table variant="simple" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>{t("Type")}</Th>
                  <Th>{t("Created")}</Th>
                  <Th>{t("Status")}</Th>
                  <Th>{t("Description")}</Th>
                  <Th>{t("Rating")}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order: any, index: number) => (
                  <OrderRow
                    accessToken={accessToken}
                    key={index}
                    order={order}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Flex
          justifyContent="flex-end"
          alignItems="flex-end"
          mt={4}
          className="mr-4 mb-2 grow"
        >
          <HStack spacing={2}>
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              isDisabled={currentPage === 0}
              size="sm"
            />
            <IconButton
              aria-label="Next page"
              icon={<ChevronRightIcon />}
              onClick={() => setCurrentPage(currentPage + 1)}
              size="sm"
              isDisabled={
                orders.length < calculateOrderSizeBasedOnScreenHeight()
              }
            />
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

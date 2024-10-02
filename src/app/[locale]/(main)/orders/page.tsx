import { auth } from "@/commons/auth";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";

const OrdersPageTable = dynamic(
  () => import("@/app/components/orders/OrdersPageTable"),
  { ssr: false },
);

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    search?: string;
    rating?: string;
    status?: string;
  };
}) {
  const session = await auth();
  const activeUser: any = session?.user;
  const accessToken: any = activeUser?.accessToken;

  let currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 0;
  let input = searchParams.search || "";
  let rateFilter = searchParams.rating ? parseInt(searchParams.rating, 10) : 0;
  let statusFilter = searchParams.status || "";

  if (isNaN(currentPage)) {
    currentPage = 0;
  }

  return (
    <Box className="h-full pt-12 flex flex-col">
      <OrdersPageTable
        currentPage={currentPage}
        input={input}
        rateFilter={rateFilter}
        statusFilter={statusFilter}
        accessToken={accessToken}
      />
    </Box>
  );
}

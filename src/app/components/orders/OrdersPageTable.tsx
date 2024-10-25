"use client";
import { calculateOrderSizeBasedOnScreenHeight } from "@/commons/screen";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchInputFilter from "./search-input-filter/SearchInputFilter";
import RateFilterSlider from "./rate-filter-slider/RateFilterSlider";
import OrdersTable from "./orders-table/OrdersTable";
import { useRouter } from "next/navigation";

export default function OrdersPageTable({
  accessToken,
  currentPage,
  input,
  rateFilter,
  statusFilter,
}: {
  accessToken: string;
  currentPage: number;
  input: string;
  rateFilter: number;
  statusFilter: string;
}) {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/all?size=${calculateOrderSizeBasedOnScreenHeight()}&page=${currentPage}&search=${input}&rating=${rateFilter}&status=${statusFilter}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        groupId: `${localStorage.getItem("GroupId")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch(() => setOrders([]));
  }, [currentPage, input, rateFilter, statusFilter, accessToken]);

  const updateUrlParams = (key: string, value: string | number) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value.toString());
    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <Box className="grow flex flex-col">
      <Box className="flex flex-col items-center">
        <SearchInputFilter
          setInput={(value: string) => updateUrlParams("search", value)}
          setStatusFilter={(value: string) => updateUrlParams("status", value)}
        />
        <RateFilterSlider
          setRateFilter={(value: number) => updateUrlParams("rating", value)}
        />
      </Box>
      <OrdersTable
        accessToken={accessToken}
        orders={orders}
        setCurrentPage={(page: number) => updateUrlParams("page", page)}
        currentPage={currentPage}
      />
    </Box>
  );
}

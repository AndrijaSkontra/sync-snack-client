"use client";
import { WarningIcon } from "@chakra-ui/icons";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function ProfileStats({ stats }: any) {
  const bgColorOut = useColorModeValue("xblue.500", "xblue.400");
  const bgColorIn = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("white", "white");

  return (
    <Box className="md:flex space-y-8 md:space-y-0">
      <Box className="space-y-8">
        <DataOrderBox
          orderStatus={stats[0].orderStatus}
          count={stats[0].count}
          bgColorOut={bgColorOut}
          bgColorIn={bgColorIn}
          textColor={textColor}
        />
        <DataOrderBox
          orderStatus={stats[1].orderStatus}
          count={stats[1].count}
          bgColorOut={bgColorOut}
          bgColorIn={bgColorIn}
          textColor={textColor}
        />
      </Box>
    </Box>
  );
}

function DataOrderBox({
  orderStatus,
  count,
  bgColorOut,
  bgColorIn,
  textColor,
}: any) {
  return (
    <Box bgColor={bgColorOut} className="p-4 mx-2 rounded-xl shadow-lg">
      <Box className="flex items-center">
        <WarningIcon color={textColor} className="size-5" />
        <Text textColor={textColor} className="p-1">
          Total {orderStatus} orders
        </Text>
      </Box>
      <Box className="rounded-xl py-4" bgColor={bgColorIn}>
        <Text className="flex justify-center">{count}</Text>
      </Box>
    </Box>
  );
}

// <DonutChart className="flex justify-center md:w-72 md:items-center md:h-full md:p-10"
//   data={typeData}
//   category="count"
//   index="type"
//   showAnimation={true}
//   variant="donut"
//   colors={['#d98068', '#8c3331', '#681615']}
//   valueFormatter={dataFormatter} />

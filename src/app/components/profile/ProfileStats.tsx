"use client";
import { WarningIcon } from "@chakra-ui/icons";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
      <ChartContainer config={chartConfig} className="min-h-[200px]">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={<CustomCursor />}
            content={<ChartTooltipContent />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
          <Bar dataKey="events" fill="var(--color-events)" radius={4} />
        </BarChart>
      </ChartContainer>
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
    <Box className="p-4 mx-2 rounded-xl shadow-lg bg-blue-500 dark:bg-blue-900">
      <Box className="flex items-center">
        <WarningIcon color={textColor} className="size-5" />
        <Text textColor={textColor} className="p-1">
          Total {orderStatus} orders
        </Text>
      </Box>
      <Box className="rounded-xl py-4 bg-blue-200 dark:bg-blue-950">
        <Text className="flex justify-center">{count}</Text>
      </Box>
    </Box>
  );
}

const chartData = [
  { month: "January", events: 186, orders: 80 },
  { month: "February", events: 305, orders: 200 },
  { month: "March", events: 237, orders: 120 },
  { month: "April", events: 73, orders: 190 },
  { month: "May", events: 209, orders: 130 },
  { month: "June", events: 214, orders: 140 },
];

const chartConfig = {
  events: {
    label: "events",
    color: "var(--chart-1)",
  },
  orders: {
    label: "orders",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const CustomCursor = (props: any) => {
  const { x, y, width, height } = props;
  return (
    <Rectangle
      fill="#000000"
      opacity={0.3}
      x={x}
      y={y}
      width={width}
      height={height}
      radius={10}
    />
  );
};

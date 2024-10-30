import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import { Separator } from "@/components/ui/separator";

export function OrderEventCardComponent({ orders, cancelOrder, finishOrder }: any) {
  return (
    <>
      {orders && orders.length > 0 ? (
        orders.map((order: any) => (
          <Box key={order.orderId} className="border shadow-lg m-4 p-4 flex flex-col space-y-3">
            <Box className="flex justify-between">
              <Box className="flex space-x-1">
                <Text className="text-sm">{order.firstName}</Text>
                <Text className="text-sm">{order.lastName}</Text>
              </Box>
              <Text className="text-gray-400">{order.createdAt.split("T")[1].split(".")[0]}</Text>
            </Box>
            <Tooltip label={order.additionalOptions.description} aria-label="Full description" hasArrow>
              <Text className="font-semibold text-lg">
                {order.additionalOptions.description.length > 50
                  ? `${order.additionalOptions.description.slice(0, 50)}...`
                  : order.additionalOptions.description}
              </Text>
            </Tooltip>
            <Separator />
            <Box className="flex justify-between">
              <Button colorScheme="xred" onClick={() => cancelOrder(order.orderId)}>
                Cancel
              </Button>
              <Button colorScheme="xblue" onClick={() => finishOrder(order.orderId)}>
                Finish
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <Text>No orders</Text>
      )}
    </>
  );
}

import React from "react";
import { Box, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { OrderModalComponentProps } from "@/commons/interfaces";

export default function OrderDescriptionModalComponent({
  description,
  onClose,
}: OrderModalComponentProps) {
  return (
    <Box className="py-10 pt-10">
      <VStack spacing={4} align="stretch">
        <Text fontSize="md" textAlign="justify">
          {description}
        </Text>
        <Button colorScheme="xorange" onClick={onClose}>
          Close
        </Button>
      </VStack>
    </Box>
  );
}

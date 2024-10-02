import React from 'react';
import { Box, Text, VStack, Heading, Button } from '@chakra-ui/react';
import { OrderModalComponentProps } from '@/commons/interfaces';

export default function OrderDescriptionModalComponent({ description, onClose }: OrderModalComponentProps) {
  return (
    <Box

    >
      <VStack spacing={4} align="stretch">
        <Heading size="lg" textAlign="center">Description</Heading>
        <Text fontSize="md" textAlign="justify">{description}</Text>
        <Button colorScheme="xorange" onClick={onClose}>
          Close
        </Button>
      </VStack>
    </Box>
  );
}

import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import {
  OrdersOrderModalComponentProps,
  StarProps,
} from "@/commons/interfaces";

function Star({ value, handleClick, isFull }: StarProps) {
  return (
    <StarIcon
      boxSize={10}
      color={isFull ? "yellow.400" : "gray.300"}
      cursor="pointer"
      onClick={() => handleClick(value)}
      _hover={{ transform: "scale(1.1)" }}
      transition="transform 0.2s"
    />
  );
}

export default function OrderRateModalComponent({
  coffeeOrderId,
  onClose,
  accessToken,
  setRating,
}: OrdersOrderModalComponentProps) {
  const [givenStars, setGivenStars] = useState<number | null>(null);
  const starsValues = [1, 2, 3, 4, 5];
  const toast = useToast();

  const handleRating = async () => {
    if (givenStars) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/rate?orderId=${coffeeOrderId}&rating=${givenStars}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error();
        }

        setRating(givenStars);

        toast({
          title: "Rating submitted",
          description: "Thank you for your feedback!",
          status: "success",
          duration: 3000,
          isClosable: true,
          colorScheme: "xblue",
        });

        // Close the modal after successful submission
        onClose();
      } catch (error) {
        console.error("Error updating order:", error);
        toast({
          title: "Error",
          description: "An error occurred while submitting your rating",
          status: "error",
          duration: 3000,
          isClosable: true,
          colorScheme: "xorange",
        });
      }
    } else {
      toast({
        title: "Rating required",
        description: "Please select a star rating before submitting",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <VStack spacing={6}>
        <HStack spacing={2}>
          {starsValues.map((value) => (
            <Star
              key={value}
              value={value}
              handleClick={setGivenStars}
              isFull={givenStars !== null && value <= givenStars}
            />
          ))}
        </HStack>
        <Button
          onClick={handleRating}
          bg="orange.300"
          size="lg"
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
          transition="all 0.2s"
        >
          Submit Rating
        </Button>
      </VStack>
    </Box>
  );
}

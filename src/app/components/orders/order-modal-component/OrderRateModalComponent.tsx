import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  HStack,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import {
  OrdersOrderModalComponentProps,
  StarProps,
} from "@/commons/interfaces";
import clsx from "clsx";

function Star({ value, handleClick, isFull }: StarProps) {
  return (
    <StarIcon
      className={clsx(
        "w-10 h-10 hover:scale-125 transition ease-in cursor-pointer",
        { "fill-blue-500 dark:fill-blue-900": isFull },
      )}
      color={isFull ? "blue.400" : "gray.300"}
      onClick={() => handleClick(value)}
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
    <Box className="px-16 py-10 rounded-2xl dark:gray-900">
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
          colorScheme="xblue"
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

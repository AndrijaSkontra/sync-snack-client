"use client";
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export default function StepsCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <Box className="flex flex-col p-6 space-y-2 m-2 rounded-lg max-w-80 dark:bg-blue-950 bg-gray-100 shadow-lg">
      <Heading fontFamily="'Source Code Pro Variable', monospace;">
        {step}
      </Heading>
      <Text className="font-bold text-gray-500">{title}</Text>
      <Text className="text-gray-500">{description}</Text>
    </Box>
  );
}

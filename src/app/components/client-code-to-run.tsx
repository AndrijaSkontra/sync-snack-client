"use client";

import { Text, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

export default function ClientCodeToRun() {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorMode]);

  return <Text className="text-white text-2xl"></Text>;
}

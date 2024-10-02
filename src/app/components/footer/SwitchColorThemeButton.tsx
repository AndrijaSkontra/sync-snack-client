"use client";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function SwitchColorThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const MotionIconButton = motion(IconButton);
  return (
    <MotionIconButton
      aria-label="Search database"
      colorScheme="xblue"
      onClick={() => {
        setTimeout(() => {
          toggleColorMode();
        }, 500);
      }}
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      whileTap={{ scale: 0.5 }}
      transition="0.5s linear"
    />
  );
}

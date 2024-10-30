"use client";
import "client-only";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function SwitchColorThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  function darkModeHandler() {
    if (localStorage.getItem("chakra-ui-color-mode")) {
      if (localStorage.getItem("chakra-ui-color-mode") === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }

  darkModeHandler();

  const MotionIconButton = motion(IconButton);
  return (
    <MotionIconButton
      aria-label="Search database"
      colorScheme="xblue"
      onClick={() => {
        toggleColorMode();
        darkModeHandler();
      }}
      icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      whileTap={{ scale: 0.5 }}
      transition="0.5s linear"
    />
  );
}

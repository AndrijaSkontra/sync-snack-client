"use client";
import { Image, useColorMode } from "@chakra-ui/react";

export default function ImageDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      {colorMode === "light" ? (
        <Image src="/SyncSnackLogo.png" />
      ) : (
        <Image src="/whitelogo.png" />
      )}
    </>
  );
}

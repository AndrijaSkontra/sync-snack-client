"use client";
import { Image, useColorMode } from "@chakra-ui/react";

export default function HeadingSyncSnack() {
  const { colorMode } = useColorMode();
  return (
    <>
      {colorMode === "light" ? (
        <Image
          src="/AppTitleLight.svg"
          alt="nopic"
          className="max-w-80 md:max-w-max"
        />
      ) : (
        <Image
          src="/AppTitleDark.svg"
          alt="nopic"
          className="max-w-80 md:max-w-max"
        />
      )}
    </>
  );
}

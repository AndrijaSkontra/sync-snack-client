"use client";
import { Image, useColorMode } from "@chakra-ui/react";

export default function LandingImage() {
  const { colorMode } = useColorMode();
  return (
    <>
      {colorMode === "light" ? (
        <Image
          src="/grupa-light.svg"
          alt="nopic"
          className="mx-10 mt-10 mb-4 md:mt-4 md:size-96"
        />
      ) : (
        <Image
          src="/grupa-plava-dark-mode.svg"
          alt="nopic"
          className="mx-10 mt-10 mb-4 md:mt-4 md:size-96"
        />
      )}
    </>
  );
}

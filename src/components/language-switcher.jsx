"use client";
import { Box, Image } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";

/**
 * check does pathname starts with /hr or /en
 * if not then add /hr to the pathname
 * if pathname is not /hr or /en
 * then to the pathname should append hr or en
 */
export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  let appendUrl = false;
  if (pathname.slice(0, 3) !== "/hr" && pathname.slice(0, 3) !== "/en") {
    appendUrl = true;
  }

  const [croatianSelected, setCroatianSelected] = useState(false);

  const currentLanguage = pathname.slice(1, 3);

  useEffect(() => {
    if (currentLanguage === "hr") {
      setCroatianSelected(true);
    }
  }, []);

  return (
    <Box className="flex justify-around mb-4">
      <Image
        className={clsx("size-8 hover:scale-125 transition ease-in", {
          "grayscale-[0.8]": !croatianSelected,
        })}
        objectFit="cover"
        rounded="full"
        borderRadius="full"
        alt="croatia"
        src="/croatia.png"
        onMouseDown={() => {
          if (appendUrl) {
            router.push(`/hr${pathname}`);
          } else {
            router.push(`/hr${pathname.slice(3, pathname.length)}`);
          }
        }}
      />
      <Image
        className={clsx("size-8 hover:scale-125 transition ease-in", {
          "grayscale-[0.8]": croatianSelected,
        })}
        objectFit="cover"
        rounded="full"
        borderRadius="full"
        alt="english"
        src="/uk.png"
        onMouseDown={() => {
          if (appendUrl) {
            router.push(`/en${pathname}`);
          } else {
            router.push(`/en${pathname.slice(3, pathname.length)}`);
          }
        }}
      />
    </Box>
  );
}

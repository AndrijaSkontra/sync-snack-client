"use client";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function SignOutButton() {
  const t = useTranslations("Footer");

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return (
    <Button colorScheme="xblue" onClick={handleSignOut}>
      {t("SignOutButton")}
    </Button>
  );
}

"use client";
import { Text, useToast } from "@chakra-ui/react";
import React, { use, useState } from "react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import Modal from "../../modals/Modal";
import PasswordChangeCard from "../password-change-card-component/PasswordChangeCardComponent";
import { title } from "process";

export default function ForgotYourPasswordModal() {
  const t = useTranslations("LoginPage");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Text
        onClick={() => {
          toast({
            title: "TODO",
            description: "implement forgot password ui",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }}
        as={NextLink}
        href="#"
        color="xblue.100"
        _hover={{ color: "xblue.600" }}
        cursor="pointer"
        className="mt-2"
      >
        {t("Forgotpassword")}
      </Text>
    </>
  );
}


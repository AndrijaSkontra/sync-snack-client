"use client";
import { Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import ChangePasswordRequestModal from "../../modals/ChangePasswordRequestModal";


export default function ForgotYourPasswordLink() {
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
        onClick={handleOpenModal}
        as={NextLink}
        href="#"
        color="xblue.100"
        _hover={{ color: "xblue.600" }}
        cursor="pointer"
        className="mt-2"
      >
        {t("Forgotpassword")}
      </Text>
      <ChangePasswordRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={null} // You can pass any relevant event data here if needed
      />
    </>
  );
}
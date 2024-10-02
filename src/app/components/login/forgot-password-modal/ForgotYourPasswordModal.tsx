'use client'
import { Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import NextLink from "next/link";
import { useTranslations } from 'next-intl';
import Modal from '../../modals/Modal';
import PasswordChangeCard from '../password-change-card-component/PasswordChangeCardComponent';

export default function ForgotYourPasswordModal() {
  const t = useTranslations("LoginPage");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PasswordChangeCard onClose={handleCloseModal} />
      </Modal>
    </>
  );
}
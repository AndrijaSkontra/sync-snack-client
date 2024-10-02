"use client";
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleChangePassword } from '@/app/server-actions/change-password';
import CustomPasswordInput from './CustomPasswordInput';

const initialState: any = {
  message: null,
  errors: null,
};

export default function PasswordResetForm({ searchParams }: { searchParams: any }) {
  const t = useTranslations('ChangePasswordPage');
  const toast = useToast();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('newPassword', newPassword);
    formData.append('confirmPassword', confirmPassword);
    formData.append('passwordResetTokenId', searchParams.passwordResetTokenId);
    formData.append('resetCode', searchParams.resetCode);

    const response = await handleChangePassword(initialState, formData);

    if (response.message) {
      toast({
        title: response.message,
        status: response.message.includes("Success") ? "success" : "error",
        duration: 5000,
        isClosable: true,
      });

      if (response.message.includes("Success")) {
        router.push('/login');
      }
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>{t('enterPassword')}:</FormLabel>
          <CustomPasswordInput
            placeholder={t('passwordPlaceholder')}
            name="confirmPassword" 
            id="confirmPassword" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t('confirmPassword')}:</FormLabel>
          <CustomPasswordInput
            placeholder={t('passwordPlaceholder')}
            name="confirmPassword" 
            id="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isDisabled={isButtonDisabled}
        >
          {t('resetPasswdButton')}
        </Button>
      </VStack>
    </Box>
  );
}

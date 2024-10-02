import React, { useState } from 'react';
import { Box, VStack, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import coffeeLoadingAnimation from '@/../../public/coffeeLoading.json'; // Adjust the path as necessary
import { useTranslations } from 'next-intl';

export default function PasswordChangeCard({ onClose }: { onClose: () => void}) {
  const t = useTranslations("ChangePasswordPage");
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handleForgotYourPassword() {
    
    setIsLoading(true);

    if (email && email.trim() !== "") {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password-request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email
          }),
        });

        if (response.ok) {
          toast({
            title: "Password reset email sent",
            description: "Please check your email for further instructions.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
            colorScheme: 'xblue'
          });
          onClose();
        } else {
          const errorData = await response.json();
          if (response.status === 404) {
            toast({
              title: "User not found",
              description: "There is no account associated with this email address.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
              colorScheme: 'xorange'
            });
          } else {
            toast({
              title: "Error",
              description: errorData.message || "Something went wrong. Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
              colorScheme: 'xorange'
            });
          }
        }
      } catch (error: any) {
        console.error("Error during password reset request:", error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          colorScheme: 'xorange'
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Email required",
        description: "Please enter your email address before requesting a password reset.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
        colorScheme: 'xorange'
      });
      setIsLoading(false);
    }
  }

  return (
    <Box bg="white" textColor="xblue.200" p={6} rounded="md" shadow="md">
      <VStack as="form" onSubmit={handleForgotYourPassword} spacing={4} align="stretch">
        <FormControl>
          <FormLabel>{t("email")}</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('enterEmail')}
            borderColor="xblue.300"
            _hover={{ borderColor: "xblue.400" }}
            _focus={{ borderColor: "xblue.500", boxShadow: "0 0 0 1px #15408c" }}
          />
        </FormControl>
        
        <Button
          type="submit"
          colorScheme="xblue"
          bg="xblue.300"
          _hover={{ bg: "xblue.600" }}
          _active={{ bg: "xblue.700" }}
          disabled={isLoading}
        >
          {isLoading ? (
            <Box width="24px" height="24px">
              <Lottie
                animationData={coffeeLoadingAnimation}
                loop={true}
                autoplay={true}
              />
            </Box>
          ) : (
            `${t('resetPasswdButton')}`
          )}
        </Button>
      </VStack>
    </Box>
  );
}
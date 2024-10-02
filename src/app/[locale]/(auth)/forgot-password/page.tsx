import PasswordResetForm from '@/app/components/change-password/PasswordResetForm';
import { Box, Button, Input, Text, VStack, Container, Heading, Flex } from '@chakra-ui/react';
import { getTranslations } from 'next-intl/server';
import React from 'react';


export default async function ForgotPasswordPage({ searchParams }: { searchParams: { passwordResetTokenId: string, resetCode: string } }) {
 
    const t = await getTranslations("ChangePasswordPage");


    return (
        <Flex 
            minHeight="100vh" 
            width="100%" 
            alignItems="center" 
            justifyContent="center"
        >
            <Container maxW="lg" py={12}>
                <VStack spacing={8} align="stretch">
                <Heading as="h1" size="xl" textAlign="center" >
                    {t('title')}
                </Heading>
                <Box  p={8} borderRadius="lg" boxShadow="lg">
                    <PasswordResetForm searchParams={searchParams} />
                </Box>
                </VStack>
            </Container>
        </Flex>
    );
  }
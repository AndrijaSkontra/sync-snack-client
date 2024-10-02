import RegisterComponent from "@/app/components/register-components/RegisterComponent";
import { Box, Container, Heading, Flex } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function RegisterPage() {
  const t = await getTranslations("RegisterPage");

  return (
    <Flex
      minHeight="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="container.md">
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="xl">
            {t("title")}
          </Heading>
        </Box>

        <RegisterComponent />
      </Container>
    </Flex>
  );
}

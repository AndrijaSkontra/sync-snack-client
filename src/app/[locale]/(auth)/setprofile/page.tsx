import SetProfileComponent from "@/app/components/register-components/SetProfileComponent";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import React, { Suspense } from "react";

export default function SetUpProfilePage() {
  const t = useTranslations("SetUpProfilePage");

  return (
    <Flex
      minHeight="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Container className="bg-prim-cl" maxW="container.md" py={8}>
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="xl">
            {t("title")}
          </Heading>
        </Box>
        <Suspense fallback={<div>{t("loading")}</div>}>
          <SetProfileComponent />
        </Suspense>
      </Container>
    </Flex>
  );
}


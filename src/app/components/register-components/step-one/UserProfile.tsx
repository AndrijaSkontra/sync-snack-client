import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function UserProfile({ formData, handleInputChange }: any) {
  const t = useTranslations("StepOneUserProfile");

  return (
    <>
      <FormControl className="mb-4">
        <FormLabel>{t("firstName")}:</FormLabel>
        <Input
          name="firstName"
          placeholder={t("firstName")}
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl className="mb-4">
        <FormLabel>{t("lastName")}:</FormLabel>
        <Input
          name="lastName"
          placeholder={t("lastName")}
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </FormControl>
    </>
  );
}

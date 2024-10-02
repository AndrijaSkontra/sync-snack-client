"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  useToast,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Input,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import CustomPasswordInput from "../change-password/CustomPasswordInput";
import { useFormState } from "react-dom";
import { handleRegisterUser } from "@/app/server-actions/register-user";

export default function RegisterComponent() {
  const t = useTranslations("RegisterPage");

  const toast = useToast();

  const initialState: any = {
    message: null,
    errors: null,
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [state, formAction] = useFormState(handleRegisterUser, initialState);

  // Handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  useEffect(() => {
    const { email, password, confirmPassword } = formData;
    const isFormValid =
      email && password && confirmPassword && password === confirmPassword;
    setIsButtonDisabled(!isFormValid);
  }, [formData]);

  // Show toast based on state
  useEffect(() => {
    if (state.message) {
      if (state.message === "Succesfully registered, please check your email") {
        toast({
          title: state.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: state.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [state, toast]);

  return (
    <Box className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md">
      <form action={formAction}>
        <FormControl className="mb-4">
          <FormLabel>{t("email")}: </FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            focusBorderColor="xblue.500"
            className="mb-2"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </FormControl>

        <FormControl className="mb-4">
          <FormLabel>{t("password")}: </FormLabel>
          <CustomPasswordInput
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl className="mb-4">
          <FormLabel>{t("confirmPassword")}: </FormLabel>
          <CustomPasswordInput
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </FormControl>

        <Flex justifyContent="center" mt={6}>
          <Button
            colorScheme="xblue"
            type="submit"
            isDisabled={isButtonDisabled || state.isLoading}
            isLoading={state.isLoading}
            loadingText="Registering"
          >
            {t("title")}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}

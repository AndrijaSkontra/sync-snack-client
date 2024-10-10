"use client";
import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import PasswordInput from "./PasswordInput";
import { useFormState, useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { handleLogin } from "@/app/server-actions/login";

const initialState: any = {
  message: null,
  errors: null,
};

/**
 * Login form component for the login page.
 * Uses zod for validation.
 * @author Andrija
 */
export default function LoginForm() {
  const t = useTranslations("LoginPage");
  const [state, formAction] = useFormState(handleLogin, initialState);

  return (
    <form action={formAction}>
      <Input
        id="email"
        name="email"
        focusBorderColor="xblue.500"
        className="mb-2"
        placeholder="Email"
      />
      <PasswordInput />
      <Box className="flex justify-center items-center mt-2">
        {state && <Text textColor={"red.500"}>{state.message}</Text>}
      </Box>
      <Box className="flex justify-center items-center">
        <SubmitButton />
      </Box>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("LoginPage");

  return (
    <>
      {!pending ? (
        <Button type="submit" className="w-full mt-4" colorScheme="xblue">
          {t("Login")}
        </Button>
      ) : (
        <Spinner />
      )}
    </>
  );
}

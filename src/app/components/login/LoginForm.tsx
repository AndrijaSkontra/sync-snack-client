"use client";
import { 
  Box, 
  Button, 
  Input, 
  Spinner, 
  Text, 
  FormControl, 
  FormLabel, 
  FormErrorMessage 
} from "@chakra-ui/react";
import PasswordInput from "./PasswordInput";
import { useFormState, useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { handleLogin } from "@/app/server-actions/login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialState: any = {
  message: null,
  errors: null,
  userId: null,
};

/**
 * Login form component for the login page.
 * Uses zod for validation.
 * @author Andrija
 */
export default function LoginForm() {
  const t = useTranslations("LoginPage");
  const router = useRouter();
  const [state, formAction] = useFormState(handleLogin, initialState);

  // Handle profile setup redirect if profile is incomplete
  useEffect(() => {
    if (state.message === "Profile not complete" && state.userId) {
      router.push(`/setup-profile?userId=${state.userId}`);
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <FormControl isInvalid={!!state.errors?.email} mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          id="email"
          name="email"
          focusBorderColor="xblue.500"
          placeholder="Email"
        />
        {state.errors?.email && (
          <FormErrorMessage>{state.errors.email}</FormErrorMessage>
        )}
      </FormControl>

      <FormControl isInvalid={!!state.errors?.password} mb={4}>
        <FormLabel>Password</FormLabel>
        <PasswordInput />
        {state.errors?.password && (
          <FormErrorMessage>{state.errors.password}</FormErrorMessage>
        )}
      </FormControl>

      <Box className="flex justify-center items-center mt-2">
        {state.message && !state.errors && (
          <Text textColor="red.500">{state.message}</Text>
        )}
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
        <Button 
          type="submit" 
          className="w-full mt-4" 
          colorScheme="xblue"
        >
          {t("Login")}
        </Button>
      ) : (
        <Spinner />
      )}
    </>
  );
}
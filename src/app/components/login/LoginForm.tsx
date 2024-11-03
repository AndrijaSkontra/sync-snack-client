"use client";
import { 
  Box, 
  Button, 
  Input, 
  Spinner, 
  Text, 
  FormControl, 
  FormLabel, 
  FormErrorMessage,
  useToast 
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
  const toast = useToast();
  const showToast = (toast: any, { title, description, status }: { title: string, description: string, status: "error" | "warning" | "success" | "info" }) => {
    toast({
      title,
      description,
      status,
      duration: 4000,
      isClosable: true,
      position: "top",
      variant: "solid",
      containerStyle: {
        maxWidth: '400px'
      },
      style: {
        backgroundColor: status === 'warning' 
          ? 'var(--chakra-colors-yellow-500)' 
          : status === 'error'
          ? 'var(--chakra-colors-red-500)'
          : status === 'success'
          ? 'var(--chakra-colors-green-500)'
          : 'var(--chakra-colors-blue-500)',
        color: 'white',
        borderRadius: '8px',
        opacity: '1',
        padding: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    });
  };
  
  // Then use it in your useEffect
  useEffect(() => {
    if (state.message) {
      if (state.message.includes("not verified")) {
        showToast(toast, {
          title: "Verification Required",
          description: "Please check your email to verify your account",
          status: "warning"
        });
      } else if (state.message === "Wrong credentials") {
        showToast(toast, {
          title: "Error",
          description: "Invalid email or password",
          status: "error"
        });
      } else if (state.message === "Profile not complete" && state.userId) {
        router.push(`/setup-profile?userId=${state.userId}`);
      }
    }
  }, [state, router, toast]);

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
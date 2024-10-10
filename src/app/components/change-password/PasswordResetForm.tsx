"use client";
import { Box, Button, Input, InputGroup, InputRightElement, VStack, FormControl, FormErrorMessage, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { z } from "zod";
import { handleChangePassword } from '@/app/server-actions/change-password';
import { redirect, useSearchParams } from 'next/navigation';

interface State {
  message: string | null;
  success: boolean | null;
}

const initialState: State = {
  message: null,
  success: null,
};

const passwordSchema = z.string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
  .regex(/^(?=.*[0-9])/, "Password must contain at least one number")
  .regex(/^(?=.*[!@#$%^&*])/, "Password must contain at least one special character (!@#$%^&*)");

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" colorScheme="blue" isLoading={pending} width="full">
      Reset Password
    </Button>
  );
}

export default function PasswordResetForm() {
  const [state, formAction] = useFormState<State, FormData>(handleChangePassword, initialState);
  const [formErrors, setFormErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success" : "Error",
        description: state.message,
        status: state.success ? "success" : "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      if(state.success) {
        redirect('/login')
      }
    }
  }, [state, toast]);

  const validateForm = (formData: FormData) => {
    const result = z
      .object({
        newPassword: passwordSchema,
        confirmPassword: passwordSchema,
      })
      .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
      .safeParse({
        newPassword: formData.get("newPassword"),
        confirmPassword: formData.get("confirmPassword"),
      });

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setFormErrors(fieldErrors);
      return false;
    }

    setFormErrors({});
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Add URL parameters to the form data
    const passwordResetTokenId = searchParams.get('passwordResetTokenId');
    const resetCode = searchParams.get('resetCode');
    
    if (passwordResetTokenId && resetCode) {
      formData.append("passwordResetTokenId", passwordResetTokenId);
      formData.append("resetCode", resetCode);
    } else {
      toast({
        title: "Error",
        description: "Missing required reset information. Please check your reset link.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (validateForm(formData)) {
      formAction(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!formErrors.newPassword}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              name="newPassword"
              id="newPassword"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeIcon className="size-5" /> : <EyeSlashIcon className="size-5" />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {formErrors.newPassword && <FormErrorMessage>{formErrors.newPassword}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!formErrors.confirmPassword}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeIcon className="size-5" /> : <EyeSlashIcon className="size-5" />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {formErrors.confirmPassword && <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>}
        </FormControl>

        <Box width="full">
          <SubmitButton />
        </Box>
      </VStack>
    </form>
  );
}
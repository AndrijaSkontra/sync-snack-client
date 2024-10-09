// File: CreateRequestToChangePassword.tsx
"use client";
import { Input, Button, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { handleChangePasswordRequest } from '@/app/server-actions/handleChangePasswordRequest';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full mt-4" colorScheme="xblue" isLoading={pending}>
      Change Password Request
    </Button>
  );
}

interface State {
  message: string | null;
  success: boolean | null;
}

const initialState: State = {
  message: null,
  success: null,
};

export default function CreateRequestToChangePassword({ onCloseModal }: { onCloseModal: () => void }) {
  const [state, formAction] = useFormState<State, FormData>(handleChangePasswordRequest, initialState);
  const toast = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success" : "Error",
        description: state.message,
        status: state.success ? "success" : "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        colorScheme: state.success ? "xblue" : "xorange",
      });

      if (state.success) {
        onCloseModal();
      }
    }
  }, [state, toast, onCloseModal]);

  return (
    <form action={formAction}>
      <Input
        id="email"
        name="email"
        type="email"
        focusBorderColor="xblue.500"
        className="mb-2"
        placeholder="Email"
        required
      />
      <SubmitButton />
    </form>
  );
}
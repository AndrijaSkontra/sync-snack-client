"use client";

import { handleCreateEvent } from "@/app/server-actions/create-event";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState: any = {
  message: "",
  errors: "",
};

/**
 * This form uses hidden inputs for sending
 * data to handleCreateEvent server action.
 * @remarks This form is much smaller then it looks
 * due to the ButtonGroup
 */
export default function CreateEventForm({ onCloseModal }: any) {
  const groupId: any = localStorage.getItem("GroupId");
  const toast = useToast();
  const [state, formAction] = useFormState(handleCreateEvent, initialState);
  useEventCreated(state, toast, onCloseModal);
  const [eventType, setEventType] = useState("FOOD");
  const [timeInput, setTimeInput] = useState("10");

  return (
    <form action={formAction} className="flex flex-col gap-4 p-4 items-center">
      <Box className="flex space-x-4 px-24 flex-col items-center space-y-2 md:flex-row md:items-stretch md:space-y-0">
        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-sm font-medium px-2">Event type</legend>
          <input type="hidden" name="eventType" value={eventType} />
          <ButtonGroup isAttached className="mb-4">
            <Button
              onClick={() => setEventType("COFFEE")}
              colorScheme={eventType === "COFFEE" ? "xorange" : "gray"}
            >
              Coffee
            </Button>
            <Button
              onClick={() => setEventType("FOOD")}
              colorScheme={eventType === "FOOD" ? "xorange" : "gray"}
            >
              Food
            </Button>
            <Button
              onClick={() => setEventType("BEVERAGE")}
              colorScheme={eventType === "BEVERAGE" ? "xorange" : "gray"}
            >
              Beverage
            </Button>
          </ButtonGroup>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-sm font-medium px-2">Event type</legend>
          <input type="hidden" name="timeSelect" value={timeInput} />
          <ButtonGroup isAttached>
            <Button
              onClick={() => setTimeInput("5")}
              colorScheme={timeInput === "5" ? "xorange" : "gray"}
            >
              &nbsp;5
            </Button>
            <Button
              onClick={() => setTimeInput("10")}
              colorScheme={timeInput === "10" ? "xorange" : "gray"}
            >
              10
            </Button>
            <Button
              onClick={() => setTimeInput("15")}
              colorScheme={timeInput === "15" ? "xorange" : "gray"}
            >
              15
            </Button>
          </ButtonGroup>
        </fieldset>
      </Box>
      <Divider />
      <Input
        id="event-title"
        name="eventTitle"
        focusBorderColor="xblue.500"
        placeholder="Event Title"
        className="mb-4"
      />
      <Textarea
        id="event-description"
        name="eventDescription"
        focusBorderColor="xblue.500"
        placeholder="Description"
        className="mb-4"
      />
      {state && state.message !== "Event Created" && (
        <p className="text-red-500">{state.message}</p>
      )}
      <input type="hidden" name="groupId" value={groupId} />
      <SubmitButton />
    </form>
  );
}

function useEventCreated(state: any, toast: any, onCloseModal: any) {
  useLayoutEffect(() => {
    if (state.message === "Event Created") {
      onCloseModal();
      toast({
        title: "Event Created",
        description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        colorScheme: "xblue",
      });
      state.message = "";
    }
  }, [state.message]);
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {!pending ? (
        <Button type="submit" colorScheme="xblue" className="w-full">
          Submit
        </Button>
      ) : (
        <Spinner />
      )}
    </>
  );
}

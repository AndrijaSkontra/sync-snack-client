import React, { useLayoutEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Button,
  VStack,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";
import { handleCreateOrder } from "@/app/server-actions/create-order";

const initialState: any = {
  message: "",
  errors: "",
};

export default function CreateOrderForm({ event, onCloseModal }: any) {
  const [slider1Value, setSlider1Value] = React.useState(0);
  const [slider2Value, setSlider2Value] = React.useState(0);
  const [coffeeType, setCoffeeType] = React.useState("turkish");
  const [description, setDescription] = React.useState("");
  const [state, formAction] = useFormState(handleCreateOrder, initialState);
  const isCoffeeEvent = event.eventType === "COFFEE";
  const groupId: any = localStorage.getItem("GroupId");
  const toast = useToast();
  useOrderCreated(state, toast, onCloseModal);

  return (
    <Box className="max-w-md mx-auto mt-8 rounded-lg">
      <form action={formAction}>
        <VStack spacing={6} align="stretch">
          {isCoffeeEvent && (
            <>
              <FormControl>
                <FormLabel>Milk</FormLabel>
                <Slider
                  aria-label="slider-1"
                  colorScheme="xblue"
                  min={0}
                  max={5}
                  step={1}
                  value={slider1Value}
                  onChange={(v) => setSlider1Value(v)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text className="text-sm text-gray-600 mt-1">
                  Amount: {(slider1Value as number) * 0.5} dL
                </Text>
              </FormControl>

              <FormControl>
                <FormLabel>Sugar</FormLabel>
                <Slider
                  aria-label="slider-2"
                  colorScheme="xorange"
                  min={0}
                  max={5}
                  step={1}
                  value={slider2Value}
                  onChange={(v) => setSlider2Value(v)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text className="text-sm text-gray-600 mt-1">
                  Amount: {(slider2Value as number) * 5} g
                </Text>
              </FormControl>

              <FormControl as="fieldset">
                <RadioGroup value={coffeeType} onChange={setCoffeeType}>
                  <Stack direction="row">
                    <Radio value="turkish" colorScheme="xblue">
                      Turkish
                    </Radio>
                    <Radio value="latte" colorScheme="xorange">
                      Latte
                    </Radio>
                    <Radio value="macchiato" colorScheme="gray">
                      Macchiato
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </>
          )}

          <FormControl>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description on your order"
              size="sm"
              focusBorderColor="xblue.100"
            />
          </FormControl>

          <input type="hidden" value={slider1Value} name="milk" />
          <input type="hidden" value={slider2Value} name="sugar" />
          <input type="hidden" value={description} name="desc" />
          <input type="hidden" value={coffeeType} name="type" />
          <input type="hidden" value={event.eventType} name="eventType" />
          <input type="hidden" value={event.eventId} name="eventId" />
          <input type="hidden" value={groupId} name="groupId" />

          <Box className="flex justify-center">
            <SubmitButton />
          </Box>
          <Text className="text-sm text-red-500 flex justify-center">
            {state && state.message}
          </Text>
        </VStack>
      </form>
    </Box>
  );
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

function useOrderCreated(state: any, toast: any, onCloseModal: any) {
  useLayoutEffect(() => {
    if (state.message === "Order Created") {
      onCloseModal();
      toast({
        title: "Order Created",
        description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        colorScheme: "xorange",
      });
      state.message = "";
    }
  }, [state.message]);
}

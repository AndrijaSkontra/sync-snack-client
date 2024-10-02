import { Button, Input, Text } from "@chakra-ui/react";
import PasswordInput from "../login/PasswordInput";
import { useFormState } from "react-dom";
import { handleGroupCreate } from "@/app/server-actions/create-group";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const initialState: any = {
  message: null,
  errors: null,
};

export default function CreateGroupForm({ onClose, state, formAction }: any) {
  const toast = useToast();
  const t = useTranslations("StepTwoGroupInformaiton");

  useEffect(() => {
    if (state && state.message === "Group created") {
      state.message = "";
      onClose();
      toast({
        title: "Group created",
        description: "You've successfully created a group",
        status: "success",
        duration: 5000,
        isClosable: true,
        colorScheme: "green",
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <Input
        id="name"
        name="name"
        focusBorderColor="xblue.500"
        className="mb-2"
        placeholder={t("GroupName")}
      />
      <Input
        id="description"
        name="description"
        focusBorderColor="xblue.500"
        className="mb-2"
        placeholder={t("GroupDescription")}
      />
      <PasswordInput />
      {state && state.message !== "Group created" ? (
        <Text textColor={"red.500"}>{state.message}</Text>
      ) : null}
      <Button type="submit" className="w-full mt-4" colorScheme="xblue">
        {t("CreateGroup")}
      </Button>
    </form>
  );
}

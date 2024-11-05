"use client";
import { Button, Input, Text } from "@chakra-ui/react";
import { useFormState } from "react-dom";
import { handleGroupCreate } from "@/app/server-actions/create-group";
import { useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { UpdateGroupsSidebarContext } from "@/app/components/Providers";
import PasswordInput from "@/app/components/login/PasswordInput";
import { useRouter } from "next/navigation";

const initialState: any = {
  message: null,
  errors: null,
};

export default function CreateGroupFormMobile() {
  const toast = useToast();
  const t = useTranslations("StepTwoGroupInformaiton");
  const context = useContext(UpdateGroupsSidebarContext);
  const [state, formAction] = useFormState(handleGroupCreate, initialState);

  const router = useRouter();
  useEffect(() => {
    if (state && state.message === "Group created") {
      state.message = "";

      const newString = context.updateString + "1";
      context.setUpdateString(newString);
      toast({
        title: "Group created",
        description: "You've successfully created a group",
        status: "success",
        duration: 5000,
        isClosable: true,
        colorScheme: "green",
      });
      router.push("/profile");
    }
  }, [state]);

  return (
    <div className="rounded-xl p-4 dark:bg-stone-900 bg-gray-100">
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
    </div>
  );
}

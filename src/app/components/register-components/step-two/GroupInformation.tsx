import {
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import CustomPasswordInput from "../../change-password/CustomPasswordInput";

export default function GroupInformation({ formData, handleInputChange }: any) {
  const t = useTranslations("StepTwoGroupInformaiton");

  return (
    <>
      <FormControl className="mb-4">
        <FormLabel>{t("GroupChoice")}</FormLabel>
        <RadioGroup
          name="groupChoice"
          value={formData.groupChoice}
          onChange={handleInputChange}
        >
          <Stack direction="row">
            <Radio value="join">{t("JoinGroup")}</Radio>
            <Radio value="create">{t("CreateGroup")}</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {formData.groupChoice === "join" && (
        <>
          <FormControl className="mb-4">
            <FormLabel>{t("GroupName")}</FormLabel>
            <Input
              placeholder={t("GroupName")}
              name="groupName"
              value={formData.groupName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="mb-4">
            <FormLabel>{t("GroupPassword")}</FormLabel>
            <CustomPasswordInput
              placeholder={t("GroupPassword")}
              name="groupPassword"
              id="groupPassword"
              value={formData.groupPassword}
              onChange={handleInputChange}
            />
          </FormControl>
        </>
      )}
      {formData.groupChoice === "create" && (
        <>
          <FormControl className="mb-4">
            <FormLabel>{t("GroupName")}</FormLabel>
            <Input
              placeholder={t("GroupName")}
              name="groupName"
              value={formData.groupName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="mb-4">
            <FormLabel>{t("GroupDescription")}</FormLabel>
            <Input
              placeholder={t("GroupDescription")}
              name="groupDescription"
              value={formData.groupDescription}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl className="mb-4">
            <FormLabel>{t("GroupPassword")}</FormLabel>
            <CustomPasswordInput
              placeholder={t("GroupPassword")}
              name="groupPassword"
              id="groupPassword"
              value={formData.groupPassword}
              onChange={handleInputChange}
            />
          </FormControl>
        </>
      )}
    </>
  );
}

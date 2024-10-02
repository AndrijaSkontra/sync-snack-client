import { Box } from "@chakra-ui/react";
import SignOutButton from "./SignOutButton";
import FooterLanguageButtons from "./FooterLanguageButtons";
import SwitchColorThemeButton from "./SwitchColorThemeButton";
import { auth } from "@/commons/auth";
import ExpendableFooter from "./ExpendableFooter";

export default async function Footer() {
  let isSignOutButtonVisible = false;
  const session = await auth();
  const activeUser: any = session?.user;
  if (!!activeUser) {
    isSignOutButtonVisible = true;
  }

  return (
    <ExpendableFooter isSignOutButtonVisible={isSignOutButtonVisible}></ExpendableFooter>
  );
}

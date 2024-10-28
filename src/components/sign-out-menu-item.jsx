import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";

export default function SignOutMenuItem() {
  const t = useTranslations("Footer");

  const handleSignOut = async () => {
    localStorage.setItem("GroupId", "");
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  return (
    <DropdownMenuItem onSelect={handleSignOut}>
      {t("SignOutButton")}
    </DropdownMenuItem>
  );
}

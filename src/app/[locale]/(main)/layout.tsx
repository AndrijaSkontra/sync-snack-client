import SignOutButton from "@/app/components/footer/SignOutButton";
import MenuLayout from "@/app/components/layout/MenuLayout";
import NotificationBell from "@/app/components/layout/NotificationBell";
import SidebarGroups from "@/app/components/sidebar/SidebarGroups";
import { auth } from "@/commons/auth";
import { Box, Image, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const activeUser: any = session?.user;
  console.log(activeUser);
  if (!activeUser) {
    redirect("/login");
  }

  return (
    <>
      <Box className="flex h-screen items-stretch">
        <Box>
          <SidebarGroups accessToken={activeUser.accessToken} />
        </Box>
        <Box className="grow">{children}</Box>
      </Box>
      <Box className="fixed top-4 right-4 flex items-center space-x-6">
        <MenuLayout />
        <SignOutButton />
        <NotificationBell />
      </Box>
    </>
  );
}

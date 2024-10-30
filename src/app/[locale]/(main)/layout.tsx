import AppSidebarProvider from "@/app/components/app-sidebar-provider";
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
  console.log("\n     ACTIVE USER:");
  console.log("========= 👨 =========\n");
  console.log(activeUser);
  console.log("\n========= 👨 =========\n");
  if (!activeUser) {
    redirect("/login");
  }

  return (
    <AppSidebarProvider>
      <Box
        className="flex h-screen items-stretch"
        width={{ base: "100vw", md: "calc(100vw - 18rem)" }}
      >
        {/*<SidebarGroups accessToken={activeUser.accessToken} />*/}
        <Box></Box>
        <Box className="grow px-10 pt-10">{children}</Box>
      </Box>
      <Box className="fixed top-4 right-4 flex items-center space-x-6">
        <NotificationBell />
      </Box>
    </AppSidebarProvider>
  );
}

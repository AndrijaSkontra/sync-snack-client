"use client";
import { theme } from "@/commons/chakra-theme";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const GroupEventsContext = createContext({
  groupEvents: [],
  setGroupEvents: (value: any) => {},
});

export const UserRolesContext = createContext({
  userRoles: [],
  setUserRoles: (value: any) => {},
});

export const UpdateGroupsSidebarContext = createContext({
  updateString: "",
  setUpdateString: (value: any) => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [groupEvents, setGroupEvents] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [updateString, setUpdateString] = useState("");

  return (
    <UpdateGroupsSidebarContext.Provider
      value={{ updateString, setUpdateString }}
    >
      <UserRolesContext.Provider value={{ userRoles, setUserRoles }}>
        <GroupEventsContext.Provider value={{ groupEvents, setGroupEvents }}>
          <SessionProvider>
            <ColorModeScript initialColorMode={"system"} />
            <ChakraProvider theme={theme}>
              <SidebarProvider>
                <AppSidebar />
                <main>
                  <SidebarTrigger />
                  {children}
                </main>
              </SidebarProvider>
            </ChakraProvider>
          </SessionProvider>
        </GroupEventsContext.Provider>
      </UserRolesContext.Provider>
    </UpdateGroupsSidebarContext.Provider>
  );
}

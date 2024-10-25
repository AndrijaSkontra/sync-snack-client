"use client";
import { theme } from "@/commons/chakra-theme";
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

export const IsMyEventVisibleContext = createContext({
  isMyEventVisible: false,
  setIsMyEventVisible: (value: any) => {},
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [groupEvents, setGroupEvents] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [updateString, setUpdateString] = useState("");
  const [isMyEventVisible, setIsMyEventVisible] = useState(false);

  return (
    <UpdateGroupsSidebarContext.Provider
      value={{ updateString, setUpdateString }}
    >
      <UserRolesContext.Provider value={{ userRoles, setUserRoles }}>
        <IsMyEventVisibleContext.Provider
          value={{ isMyEventVisible, setIsMyEventVisible }}
        >
          <GroupEventsContext.Provider value={{ groupEvents, setGroupEvents }}>
            <SessionProvider>
              <ColorModeScript initialColorMode={"system"} />
              <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </SessionProvider>
          </GroupEventsContext.Provider>
        </IsMyEventVisibleContext.Provider>
      </UserRolesContext.Provider>
    </UpdateGroupsSidebarContext.Provider>
  );
}

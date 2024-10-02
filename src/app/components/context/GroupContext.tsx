"use client";
import { createContext, ReactNode, useState } from "react";

export const GroupContext = createContext({
  setGroupId: (value: any) => {},
  groupId: "",
});
export function GroupContextProvider({ children }: { children: ReactNode }) {
  const [groupId, setGroupId] = useState("");

  return (
    <GroupContext.Provider value={{ groupId, setGroupId }}>
      {children}
    </GroupContext.Provider>
  );
}

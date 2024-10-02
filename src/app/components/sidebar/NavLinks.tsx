import { Box, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  CakeIcon,
  CalendarDaysIcon,
  CommandLineIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

export default function NavLinks({ groupId, onClose }: any) {
  const links = useLinks(groupId);

  return (
    <Box className="flex flex-col space-y-4">
      {links.map((link, index) => (
        <a
          className="flex space-x-1 items-center border-2 border-black rounded-xl p-2 hover:bg-gray-400"
          key={index}
          href={link.goto}
          onClick={() => {
            localStorage.setItem("GroupId", groupId);
            onClose();
          }}
        >
          <link.icon className="h-5 w-5" />
          <Text className="text-2xl">{link.name}</Text>
        </a>
      ))}
    </Box>
  );
}

function useLinks(groupId: any) {
  const [links, setLinks] = useState([
    {
      name: "Group events",
      goto: `/group-events`,
      icon: CalendarDaysIcon,
    },
    {
      name: "Orders",
      goto: `orders`,
      icon: CommandLineIcon,
    },
    {
      name: "Group Information",
      goto: "/group",
      icon: UserGroupIcon,
    },
  ]);

  const { data: session, status }: any = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/active`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
          groupId: `${groupId}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.groupId === groupId) {
            setLinks((prev) => [
              ...prev,
              { name: "Event", goto: "/event", icon: CakeIcon },
            ]);
          }
        })
        .catch((e) => console.info("no current event link"));
    }
  }, []);
  return links;
}

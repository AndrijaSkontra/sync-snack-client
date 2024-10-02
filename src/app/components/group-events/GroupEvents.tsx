"use client";

import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import GroupEventCard from "./GroupEventCard";
import { GroupEventsContext } from "../Providers";

export default function GroupEvents() {
  const groupEventContext = useContext(GroupEventsContext);
  const { data: session, status }: any = useSession();
  useGroupEvents(groupEventContext.setGroupEvents, status, session);
  console.log(
    "if this doesnt have eventid order post doesn't work",
    groupEventContext.groupEvents,
  );

  return (
    <Box className="mt-4 grid grid-cols-1 md:grid-cols-3 md:m-20 gap-4">
      {groupEventContext.groupEvents.length > 0 ? (
        groupEventContext.groupEvents.map((groupEvent, indx) => {
          return <GroupEventCard groupEvent={groupEvent} key={indx} />;
        })
      ) : (
        <p>No events in this group...</p>
      )}
    </Box>
  );
}

function useGroupEvents(setGroupEvents: any, status: any, session: any) {
  useEffect(() => {
    if (status === "authenticated") {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
          groupId: `${localStorage.getItem("GroupId")}`,
        },
        body: JSON.stringify({ status: "PENDING", eventType: null }),
      })
        .then((res) => res.json())
        .then((data: any) => {
          if (data) {
            setGroupEvents(data);
          }
        })
        .catch((e) => console.log(e.message));
    }
  }, [status]);
}

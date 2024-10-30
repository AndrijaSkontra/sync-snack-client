"use client";

import { Box, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import GroupEventCard from "./GroupEventCard";
import { GroupEventsContext } from "../Providers";
import noEventDepression from "@/../public/noEventsDepression.json";
import Lottie from "lottie-react";


export default function GroupEvents() {
  const groupEventContext = useContext(GroupEventsContext);
  const { data: session, status }: any = useSession();
  useGroupEvents(groupEventContext.setGroupEvents, status, session);

  return (
    
    <>
      {groupEventContext.groupEvents.length > 0 ? (
        <Box className="mt-4 grid grid-cols-1 md:grid-cols-3 md:m-20 gap-4">
        {groupEventContext.groupEvents.map((groupEvent, indx) => {
          return <GroupEventCard groupEvent={groupEvent} key={indx} />;
        })}
        </Box>
      ) : (
        <Box className=" mt-6 text-center">
          <Box className="w-32 h-32 mx-auto">
            <hr/>
            <Lottie
              animationData={noEventDepression}
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
          <Text className="mt-2 text-base font-medium ">
            There are no active events in this group...
          </Text>
        </Box>
      )}
      </>
    
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

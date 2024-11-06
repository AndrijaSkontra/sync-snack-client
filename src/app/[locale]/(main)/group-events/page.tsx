import CreateEventButtonModal from "@/app/components/group-events/CreateEventButtonModal";
import GroupEvents from "@/app/components/group-events/GroupEvents";
import { auth } from "@/commons/auth";
import { Box } from "@chakra-ui/react";
import { cookies } from "next/headers";

export default async function GroupEventsPage() {
  const session: any = await auth();
  const cookieStore = await cookies();
  const groupIdCookie = cookieStore.get("GroupId");
  const activeEvent = await getActiveEvent(groupIdCookie, session);

  return (
    <Box className="m-2 mt-20">
      <CreateEventButtonModal activeEvent={activeEvent} />
      <GroupEvents />
    </Box>
  );
}

async function getActiveEvent(
  groupIdCookie: any,
  session: any,
): Promise<null | object> {
  const activeEvent = await fetch(
    `${process.env.BACKEND_URL}/api/events/active`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
        groupId: `${groupIdCookie?.value}`,
      },
    },
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return null;
    });
  return activeEvent;
}

import { auth } from "@/commons/auth";
import { Button, Text } from "@chakra-ui/react";
import ClientLeave from "./client-leave";

export default async function LeaveGroupPageForMobile() {
  const session: any = await auth();
  return <ClientLeave session={session} />;
}

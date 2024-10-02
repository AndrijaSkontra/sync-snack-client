import { auth } from "@/commons/auth";
import { Box, Link, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function JoinGroupPage({ searchParams }: any) {
  const session = await auth();
  const activeUser: any = session?.user;
  const groupStatus = await fetch(
    `${process.env.BACKEND_URL}/api/groups/joinViaInvitation/${searchParams.code}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeUser.accessToken}`,
      },
    },
  )
    .then((res) => res.status)
    .catch((e) => console.log(e));

  if (groupStatus === 404) {
    return "you are already a member of this group";
  }

  if (groupStatus === 200) {
    redirect("/profile");
    return "successful join redirecting...";
  }

  return (
    <Box>
      <Text>Trying to join...</Text>
      <Link href="/profile">Go to profile page</Link>
    </Box>
  );
}

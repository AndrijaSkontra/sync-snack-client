import AdminButtons from "@/app/components/group/AdminButtons";
import GroupData from "@/app/components/group/GroupData";
import MembersTable from "@/app/components/group/MembersTable";
import { auth } from "@/commons/auth";
import { Box, Image, Text } from "@chakra-ui/react";

export default async function GroupPage() {
  const session: any = await auth();

  return (
    <Box className="pt-16 md:pt-4 md:grid md:grid-cols-2 md:gap-10 md:grid-rows-[1fr_70%] md:h-screen md:ml-6">
      <GroupData session={session} />
      <AdminButtons />
      <Box className="flex flex-col h-4/5 p-10 border rounded-2xl shadow-lg">
        <MembersTable session={session} />
      </Box>
    </Box>
  );
}

function MvpMemberCard({ user }: { user: any }) {
  return (
    <Box className="flex rounded-xl shadow-lg overflow-hidden relative bg-orange-light-1">
      <Image
        className="h-[150px] w-[150px] rounded-l-xl mr-4"
        src={user.photoUrl}
        alt="Profile picture"
        fallbackSrc="/profile_picture.png"
        objectFit="cover"
      />
      <Box className="grow flex flex-col justify-center space-y-2 p-4">
        <Text className="font-semibold">
          {user.firstName} {user.lastName}
        </Text>
        <Box className="flex">
          <Text className="mr-1 italic bg-white p-1 rounded-md font-semibold">
            {user.score.toFixed(2)}⭐
          </Text>
        </Box>
        <Text className="italic">Orders completed: {user.orderCount}</Text>
      </Box>
      <Box className="absolute top-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-slide"></Box>
    </Box>
  );
}

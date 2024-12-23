import AdminButtons from "@/app/components/group/AdminButtons";
import GroupData from "@/app/components/group/GroupData";
import MembersTable from "@/app/components/group/MembersTable";
import { auth } from "@/commons/auth";
import { Box, Image, Text } from "@chakra-ui/react";
import { Suspense } from "react";

export default async function GroupPage() {
  const session: any = await auth();

  return (
    <Box className="pt-2 md:grid md:grid-cols-2 md:gap-10 md:grid-rows-[1fr_70%] md:ml-6">
      <GroupData session={session} />
      <Suspense fallback={<p>loading...</p>}>
        <AdminButtons />
      </Suspense>
      <Box className="md:col-span-2 col-span-1">
        <MembersTable session={session} />
      </Box>
    </Box>
  );
}

// not used
function MvpMemberCard({ user }: { user: any }) {
  return (
    <Box className="flex rounded-xl shadow-lg overflow-hidden relative bg-orange-light-1">
      <Image
        className="rounded-l-xl mr-4"
        maxWidth={150}
        maxHeight={150}
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

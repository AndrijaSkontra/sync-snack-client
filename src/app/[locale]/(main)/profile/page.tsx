import ProfileInfo from "@/app/components/profile/ProfileInfo";
import ProfileStats from "@/app/components/profile/ProfileStats";
import { auth } from "@/commons/auth";
import { Box } from "@chakra-ui/react";

export default async function ProfilePage() {
  const session: any = await auth();
  const activeUser: any = session?.user;
  const userProfileData = await fetchProfileData(activeUser);
  const userProfileOrderStats = await fetchProfileOrdersStats(activeUser);

  return (
    <Box className="flex h-4/5 justify-center items-center">
      <ProfileInfo userProfileData={userProfileData} />
      <ProfileStats stats={userProfileOrderStats} />
    </Box>
  );
}

async function fetchProfileData(activeUser: any) {
  const userProfileData = await fetch(
    `${process.env.BACKEND_URL}/api/profiles/${activeUser.userProfileId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeUser.accessToken}`,
      },
    },
  )
    .then((res) => res.json())
    .catch((err) => console.error("it breaks here: ", err));
  return userProfileData;
}

async function fetchProfileOrdersStats(activeUser: any) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/profiles/orders/stats`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeUser.accessToken}`,
      },
    },
  );

  if (!res.ok) {
    console.log("status of res", res.status);
    return fillMissingCounts([]);
  }

  const stats = await res.json();
  return fillMissingCounts(stats);
}

type OrderStatusType = {
  orderStatus?: string;
  type?: string;
  count: number;
};

const predefinedList: OrderStatusType[] = [
  { orderStatus: "CANCELLED", count: 0 },
  { orderStatus: "COMPLETED", count: 0 },
  { orderStatus: "IN_PROGRESS", count: 0 },
  { type: "FOOD", count: 0 },
  { type: "COFFEE", count: 0 },
  { type: "BEVERAGE", count: 0 },
];

function fillMissingCounts(input: OrderStatusType[]): OrderStatusType[] {
  return predefinedList.map((predefinedItem) => {
    // Check if the current predefined item exists in the input
    const foundItem = input.find(
      (item) =>
        (predefinedItem.orderStatus &&
          item.orderStatus === predefinedItem.orderStatus) ||
        (predefinedItem.type && item.type === predefinedItem.type),
    );

    // If found, return the item from input; if not, return the predefined item with count 0
    return foundItem
      ? { ...predefinedItem, count: foundItem.count }
      : predefinedItem;
  });
}

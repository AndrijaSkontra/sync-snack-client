"use server";

import { auth } from "@/commons/auth";

export async function handleGroupJoin(prevState: any, formData: FormData) {
  const name = formData.get("groupName");
  const password = formData.get("groupPassword");
  const session: any = await auth();

  const res = await fetch(`${process.env.BACKEND_URL}/api/groups/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
    body: JSON.stringify({ name, password }),
  });
  if (!res.ok) {
    return {
      message: "Already in this group/Wrong password",
    };
  }

  return { message: "Group joined" };
}

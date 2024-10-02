"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface UserProfileData {
  userId: string | null;
  firstName: string;
  lastName: string;
}

interface GroupData {
  name: string;
  password: string;
  description?: string;
}

export async function createUserProfile(data: UserProfileData) {
  try {
    const formData = new FormData();

    // this should alse work as a file?
    const jsonBlob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    formData.append("body", jsonBlob, "userProfile.json");

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/profiles/create`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (response.status === 409) {
      return { error: "User profile already exists" };
    }

    if (!response.ok) {
      throw new Error("Failed to create user profile");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error creating user profile:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function createGroup(data: GroupData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create group");
    }

    const groupData = await response.json();
    return { groupId: groupData.groupId };
  } catch (error: any) {
    console.error("Error creating group:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function joinGroup(
  userId: string | null,
  groupName: string,
  groupPassword: string,
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/join`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name: groupName,
          password: groupPassword,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to join group");
    }

    const groupData = await response.json();
    return { groupId: groupData.groupId };
  } catch (error: any) {
    console.error("Error joining group:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function setupProfile(userId: string | null, formData: any) {
  const userProfileResult = await createUserProfile({
    userId,
    firstName: formData.firstName,
    lastName: formData.lastName,
  });

  if (userProfileResult.error) {
    return { error: userProfileResult.error };
  }

  if (formData.groupChoice === "create") {
    const groupResult = await createGroup({
      name: formData.groupName,
      password: formData.groupPassword,
      description: formData.groupDescription,
    });
    if (groupResult.error) {
      return { error: groupResult.error };
    }
    return { success: true, groupId: groupResult.groupId };
  } else if (formData.groupChoice === "join") {
    const joinResult = await joinGroup(
      userId,
      formData.groupName,
      formData.groupPassword,
    );
    if (joinResult.error) {
      return { error: joinResult.error };
    }
    return { success: true, groupId: joinResult.groupId };
  }
  redirect("/profile");

  return { success: true };
}

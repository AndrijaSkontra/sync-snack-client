"use server";
import { auth } from "@/commons/auth";
import z from "zod";

export async function handleGroupCreate(prevState: any, formData: FormData) {
  const session = await auth();
  const activeUser: any = session?.user;

  const schema = z.object({
    name: z.string().min(3),
    description: z.string(),
    password: z.string().min(3),
  });
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid group data",
    };
  }
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/create`, {
      headers: {
        authorization: `Bearer ${activeUser.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(validatedFields.data),
    });

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/groups/join`, {
      headers: {
        authorization: `Bearer ${activeUser.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: validatedFields.data.name,
        password: validatedFields.data.password,
      }),
    });
  } catch (e: any) {
    return {
      message: "Something went wrong",
    };
  }
  return {
    message: "Group created",
  };
}

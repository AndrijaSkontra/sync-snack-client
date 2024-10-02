"use server";
import { auth } from "@/commons/auth";
import z from "zod";

export async function handleRolesChange(prevState: any, formData: FormData) {
  const schema = z.object({
    user: z.string().min(2),
    admin: z.string().min(2),
    president: z.string().min(2),
    groupId: z.string().min(1),
  });
  const validatedFields = schema.safeParse({
    user: formData.get("user"),
    admin: formData.get("admin"),
    president: formData.get("president"),
    groupId: formData.get("groupId"),
  });
  if (!validatedFields.success) {
    return {
      message: `${validatedFields.error.flatten().fieldErrors.user}${validatedFields.error.flatten().fieldErrors.admin}${validatedFields.error.flatten().fieldErrors.president}`,
    };
  }
  const res = await fetch("http://localhost:3000/api/roles", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(validatedFields.data),
  });
  if (res.status !== 200) {
    return { message: "Something went wrong" };
  }
  return { message: "Roles changed" };
}

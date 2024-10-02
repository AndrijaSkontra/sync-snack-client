"use server";
import { signIn } from "@/commons/auth";
import { redirect } from "next/navigation";
import z from "zod";

/**
 * Function that takes care of the whole login logic.
 * Redirects if needed or returns the { message: "" }
 * object to show on the UI.
 *
 * To redirect to the setup profile page:
 * The nextjs redirect throws an error and doesn't work in
 * try/catch, so we need to throw e.message => Next redirect handle:UserId:${userId}
 * Then we redirect in the this function.
 *
 * @author Andrija Skontra
 */
export async function handleLogin(prevState: any, formData: FormData) {
  try {
    const validatedFields = validateUserInput(formData);
    await checkDoesUserHaveProfile(validatedFields);
    await signInUser(validatedFields);
  } catch (e: any) {
    const message: string = e.message;
    const messageList = message.split(":");
    if (messageList[0] === "Next redirect handle") {
      redirect(`/setprofile?userId=${messageList[2]}`);
    }
    return { message: e.message[0] };
  }
  redirect("/profile");
}

function validateUserInput(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });

  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    throw new Error("Email or Pass bad input");
  }
  return validatedFields;
}

async function checkDoesUserHaveProfile(validatedFields: any) {
  const getUserIdResponse = await fetch(
    `${process.env.BACKEND_URL}/api/users/id?email=${validatedFields.data.email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!getUserIdResponse.ok) {
    return { message: "Something went wrong... with /api/users/id?email" };
  }

  const userIdJson = await getUserIdResponse.json();
  const userId: any = userIdJson.userId;

  const res = await fetch(
    `${process.env.BACKEND_URL}/api/users/profile?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!res.ok) {
    return {
      message: "Something went wrong... with /api/users/profile?userId",
    };
  }

  const isProfilePresentJson = await res.json();
  const isProfilePresent = isProfilePresentJson.isProfilePresent;

  if (isProfilePresent === false) {
    throw new Error(`Next redirect handle:UserId:${userId}`);
  }
}

async function signInUser(validatedFields: any) {
  try {
    await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });
  } catch (e) {
    throw new Error("Wrong credentials");
  }
}

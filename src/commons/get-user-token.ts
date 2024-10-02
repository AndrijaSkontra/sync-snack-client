"use server";
import { auth } from "./auth";

// doesn't work in client?
export async function getUserToken() {
  const session = await auth();
  const activeUser: any = session?.user;

  return activeUser.accessToken;
}

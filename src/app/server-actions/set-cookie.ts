"use server";

import { cookies } from "next/headers";

export async function setCookie() {
  console.log("setting cookie 🤩");
  cookies().set("test", "wow");
}

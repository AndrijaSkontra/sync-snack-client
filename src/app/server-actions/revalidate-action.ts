"use server";
import { revalidatePath } from "next/cache";

export default async function revalidateStuff() {
  revalidatePath("/group-events");
}

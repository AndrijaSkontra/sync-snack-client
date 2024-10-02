"use server";

import { auth } from "@/commons/auth";
import { z } from "zod";

/**
 * This function handles user input validation on event creation and
 * sends a request to try creating the event for the user.
 *
 * @author Andrija Skontra
 */
export async function handleCreateEvent(prevState: any, formData: FormData) {
  try {
    const validatedFields = validateUserInput(formData);
    await sendCreateEventRequest(validatedFields, formData);
  } catch (e: any) {
    return { message: e.message };
  }
  return { message: "Event Created" };
}

async function sendCreateEventRequest(
  validatedFields: any,
  formData: FormData,
) {
  console.log(
    "validatedFields",
    validatedFields,
    " > ",
    formData.get("groupId"),
  );
  console.log(`${process.env.BACKEND_URL}/api/events/create`);

  const session = await auth();
  const activeUser: any = session?.user;
  await fetch(`${process.env.BACKEND_URL}/api/events/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${activeUser.accessToken}`,
      groupId: `${formData.get("groupId")}`,
    },
    body: JSON.stringify(validatedFields.data),
  }).catch((e) => {
    throw new Error(`Failed to create event ${e.message}`);
  });
}

function validateUserInput(formData: FormData) {
  const schema = z.object({
    eventType: z.string(),
    title: z.string().min(2),
    description: z.string(),
    pendingTime: z.number(),
  });

  const pendingTime: any = formData.get("timeSelect");
  const pendingTimeNum: number = +pendingTime;

  const validatedFields = schema.safeParse({
    eventType: formData.get("eventType"),
    title: formData.get("eventTitle"),
    description: formData.get("eventDescription"),
    pendingTime: pendingTimeNum,
  });

  if (!validatedFields.success) {
    throw new Error("Invalid Event");
    // include if you want error specific for the input field
    // errors: validatedFields.error.flatten().fieldErrors,
  }
  return validatedFields;
}

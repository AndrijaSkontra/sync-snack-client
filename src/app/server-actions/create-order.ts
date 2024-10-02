"use server";

import { auth } from "@/commons/auth";
import { z } from "zod";

export async function handleCreateOrder(prevState: any, formData: FormData) {
  const isCoffeeEventType = formData.get("eventType") === "COFFEE";
  try {
    const validatedFields = validateUserInput(formData, isCoffeeEventType);
    await sendCreateOrderRequest(validatedFields, formData);
  } catch (e: any) {
    return { message: e.message };
  }
  return { message: "Order Created" };
}

async function sendCreateOrderRequest(
  validatedFields: any,
  formData: FormData,
) {
  // TODO: add milk and sugar values to post request
  const description = validatedFields.data.desc;
  const eventId = formData.get("eventId");
  const toSendObject = {
    eventId,
    additionalOptions: {
      description,
    },
  };

  const session = await auth();
  const activeUser: any = session?.user;

  const res = await fetch(`${process.env.BACKEND_URL}/api/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${activeUser.accessToken}`,
      groupId: `${formData.get("groupId")}`,
    },
    body: JSON.stringify(toSendObject),
  });
  if (!res.ok) {
    throw new Error(`You already have an order on this event!`);
  }
}

function validateUserInput(formData: FormData, isCoffeeEventType: boolean) {
  if (isCoffeeEventType) {
    const schema = z.object({
      type: z.string().min(1),
      milk: z.string().optional(),
      sugar: z.string().optional(),
      desc: z.string(),
    });

    const validatedFields = schema.safeParse({
      type: formData.get("type"),
      milk: formData.get("milk"),
      sugar: formData.get("sugar"),
      desc: formData.get("desc"),
    });

    if (!validatedFields.success) {
      throw new Error("Invalid Order");
      // include if you want error specific for the input field
      // errors: validatedFields.error.flatten().fieldErrors,
    }
    return validatedFields;
  } else {
    const schema = z.object({
      desc: z.string().min(1),
    });

    const validatedFields = schema.safeParse({
      desc: formData.get("desc"),
    });

    if (!validatedFields.success) {
      throw new Error("Invalid Order");
      // include if you want error specific for the input field
      // errors: validatedFields.error.flatten().fieldErrors,
    }
    return validatedFields;
  }
}

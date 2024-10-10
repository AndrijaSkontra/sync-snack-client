// File: handleChangePasswordRequest.ts
"use server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function handleChangePasswordRequest(prevState: any, formData: FormData) {
  const email = formData.get("email") as string | null;

  if (!email) {
    return { success: false, message: "Email is required" };
  }

  try {
    schema.parse({ email });
  } catch (error) {
    return { success: false, message: "Invalid email address" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/reset-password-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (response.ok) {
      return { success: true, message: "Password reset email sent. Please check your email for further instructions." };
    } else {
      const errorData = await response.json();
      if (response.status === 404) {
        return { success: false, message: "There is no account associated with this email address." };
      } else {
        return { success: false, message: errorData.message || "Something went wrong. Please try again." };
      }
    }
  } catch (error) {
    console.error("Error during password reset request:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
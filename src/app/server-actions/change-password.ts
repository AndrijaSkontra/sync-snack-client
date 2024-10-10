"use server";
import { z } from "zod";

const passwordSchema = z.string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
    "Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)"
  );

const schema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
    passwordResetTokenId: z.string(),
    resetCode: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function handleChangePassword(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
    passwordResetTokenId: formData.get("passwordResetTokenId"),
    resetCode: formData.get("resetCode"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.errors[0].message,
    };
  }

  const { newPassword, passwordResetTokenId, resetCode } = validatedFields.data;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/resetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passwordResetTokenId,
          resetCode,
          newPassword,
        }),
      }
    );

    if (response.ok) {
      return {
        success: true,
        message: "Password successfully changed. You can now log in with your new password.",
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Failed to reset password. Please try again.",
      };
    }
  } catch (error) {
    console.error("Error during password reset:", error);
    return {
      success: false,
      message: "An error occurred during password reset. Please try again later.",
    };
  }
}
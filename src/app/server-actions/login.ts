"use server";
import { signIn } from "@/commons/auth";
import { redirect } from "next/navigation";
import z from "zod";

/**
 * Function that takes care of the whole login logic.
 * 
 * Redirects if needed or returns the { message: "" }
 * object to show on the UI.
 * 
 * To redirect to the setup profile page:
 * The nextjs redirect throws an error and doesn't work in
 * try/catch, so we need to throw e.message => Next redirect handle:UserId:${userId}
 * Then we redirect in this function.
 * 
 * @author Andrija Skontra
 */
export async function handleLogin(prevState: any, formData: FormData) {
  try {
    // Validate input first
    const validatedFields = validateUserInput(formData);
    
    // Check if user profile exists
    const userId = await checkDoesUserHaveProfile(validatedFields);
    
    // Attempt to sign in
    await signInUser(validatedFields);
  } catch (e: any) {
    // Differentiate between various error types
    if (e.message === "Email is required") {
      return { errors: { email: "Email is required" } };
    }
    
    if (e.message === "Invalid email format") {
      return { errors: { email: "Please enter a valid email address" } };
    }
    
    if (e.message === "Password is required") {
      return { errors: { password: "Password is required" } };
    }
    
    if (e.message === "Password too short") {
      return { errors: { password: "Password must be at least 3 characters long" } };
    }
    
    if (e.message === "Wrong credentials") {
      return { message: "Wrong email or password" };
    }
    
    if (e.message.startsWith("Next redirect handle:UserId:")) {
      // Extract userId from the error message
      const userId = e.message.split(":")[3];
      return { message: "Profile not complete, please check your email...", userId };
    }
    
    // Catch-all for unexpected errors
    return { message: "An unexpected error occurred. Please try again." };
  }
  
  // Successful login
  redirect("/profile");
}

function validateUserInput(formData: FormData) {
  // Enhanced validation schema
  const schema = z.object({
    email: z.string({ 
      required_error: "Email is required",
      invalid_type_error: "Email must be a string"
    })
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
    
    password: z.string({ 
      required_error: "Password is required",
      invalid_type_error: "Password must be a string"
    })
    .trim()
    .min(3, { message: "Password too short" })
  });

  // Validate input
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Throw specific errors if validation fails
  if (!validatedFields.success) {
    // Get the first error message
    const firstError = validatedFields.error.errors[0].message;
    throw new Error(firstError);
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
    }
  );

  if (!getUserIdResponse.ok) {
    throw new Error("Unable to retrieve user ID");
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
    }
  );

  if (!res.ok) {
    throw new Error("Unable to check user profile");
  }

  const isProfilePresentJson = await res.json();
  const isProfilePresent = isProfilePresentJson.isProfilePresent;

  if (isProfilePresent === false) {
    throw new Error(`Next redirect handle:UserId:${userId}`);
  }

  return userId;
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
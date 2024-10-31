"use server";

/**
 * Handle register user is a custom function that handles registration of users for this application.
 * 
 * @param prevState 
 * @param formData 
 * @returns 
 */
export async function handleRegisterUser(prevState: any, formData: FormData) {
  // Retrieve values from FormData
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;
  
  // Initialize errors object
  const errors: { [key: string]: string } = {};

  // Email validation
  if (!email || !email.includes("@")) {
    errors.email = "Invalid email address";
  }

  // Comprehensive password validation
  if (!password) {
    errors.password = "Password is required";
  } else {
    // Check password length
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // Check for at least one number
    if (!/\d/.test(password)) {
      errors.password = "Password must contain at least one number";
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.password = "Password must contain at least one special character (!@#$%^&*, etc.)";
    }
  }

  // Confirm password validation
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // If there are any validation errors, return them
  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: "Invalid input",
    };
  }

  // Try to register the user
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (response.status === 400) {
      return {
        message: "Email already in use",
      };
    }

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    return {
      message: "Successfully registered, please check your email",
    };
  } catch (e: any) {
    return {
      message: "Error occurred during registration",
    };
  }
}
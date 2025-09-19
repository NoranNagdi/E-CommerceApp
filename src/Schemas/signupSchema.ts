import * as z from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" })
      .max(20, { message: "Name must be at most 20 characters" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .regex(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "Please enter a valid email address",
      }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    rePassword: z
      .string()
      .nonempty({ message: "Password Confirmation is required" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    phone: z
      .string()
      .nonempty({ message: "Phone is required" })
      .regex(/^(002|\+2)?01[0-25]\d{8}$/, {
        message: "Please enter a valid phone number",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const signupFormState: SignupFormStateType = {
  success: false,
  error: {
    name: [],
    email: [],
    password: [],
    rePassword: [],
    phone: [],
  },
  message: null,
};
export type SignupFormStateType = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string | null;
};

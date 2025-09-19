import * as z from "zod";

export const contactSchema = z.object({
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
  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .regex(/^(002|\+2)?01[0-25]\d{8}$/, {
      message: "Please enter a valid phone number",
    }),
  msg: z.string().nonempty({ message: "Message is required" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

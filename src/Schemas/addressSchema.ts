import * as z from "zod";

export const addressSchema = z.object({
  details: z.string().nonempty({ message: "Address is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .regex(/^(002|\+2)?01[0-25]\d{8}$/, {
      message: "Please enter a valid phone number",
    }),
  paymentMethod: z.enum(["cash", "card"], {
    message: "Payment method is required",
  }),
  cartId: z.string().nonempty({ message: "Cart ID is required" }),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export const addressFormState: AddressFormStateType = {
  success: false,
  error: {
    cartId: [],
    details: [],
    city: [],
    phone: [],
    paymentMethod: [],
  },
  paymentMethod: "cash",
  callbackURL: "",
  message: null,
};
export type AddressFormStateType = {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[];
  };
  paymentMethod: string;
  callbackURL?: string;
  message: string | null;
};

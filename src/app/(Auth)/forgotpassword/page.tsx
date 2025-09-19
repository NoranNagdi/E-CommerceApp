"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/Components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const emailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .regex(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Please enter a valid email address",
    }),
});
const codeSchema = z.object({
  resetCode: z.string().min(3, "Code is too short"),
});
const passwordSchema = z.object({
  newPassword: z
    .string()
    .nonempty({ message: "Password is required" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export default function ForgotPassword() {
  const [step, setStep] = useState(1);

  const router = useRouter();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  });
  const codeForm = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
  });
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const handleSendEmail = async (values: z.infer<typeof emailSchema>) => {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    if (res.ok) setStep(2);
    else {
      toast.error(data.message || "❌ Error sending reset code", {
        position: "top-center",
        style: {
          background: "#db4444",
          color: "#fff",
        },
      });
    }
  };

  const handleVerifyCode = async (values: z.infer<typeof codeSchema>) => {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    if (res.ok) setStep(3);
    else {
      toast.error(data.message || "❌ Invalid reset code", {
        position: "top-center",
        style: {
          background: "#db4444",
          color: "#fff",
        },
      });
    }
  };

  const handleResetPassword = async (
    values: z.infer<typeof passwordSchema>
  ) => {
    const email = emailForm.getValues("email");
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: values.newPassword }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      toast.success("✅ Password reset successfully", {
        position: "top-center",
        style: {
          background: "#0fcd60",
          color: "#fff",
        },
      });
      router.push("/login");
    } else {
      toast.error(data.message || "❌ Error resetting password", {
        position: "top-center",
        style: {
          background: "#db4444",
          color: "#fff",
        },
      });
    }
  };

  return (
    <section className="py-20">
      <div className="container">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(handleSendEmail)}
                  className="space-y-4"
                >
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center">
                    <Button type="submit" className="btn">
                      Send Reset Code
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            {step === 2 && (
              <Form {...codeForm}>
                <form
                  onSubmit={codeForm.handleSubmit(handleVerifyCode)}
                  className="space-y-4"
                >
                  <FormField
                    control={codeForm.control}
                    name="resetCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reset Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center">
                    <Button type="submit" className="btn">
                      Verify Code
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            {step === 3 && (
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handleResetPassword)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center">
                    <Button type="submit" className="btn">
                      Reset Password
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

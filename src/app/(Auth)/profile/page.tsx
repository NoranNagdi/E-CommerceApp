"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
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
import { toast } from "sonner";
import { getLoggedUserToken } from "@/lib/serverUtils";
import { passwordSchema, profileSchema } from "@/Schemas/profileDataSchema";
import { useEffect, useState } from "react";
import { getUserData } from "@/Services/UserData.Service";

export default function Profile() {
  const [token, setToken] = useState<string | null>(null);
  async function fetchToken() {
    const token = (await getLoggedUserToken()) as string | null;
    setToken(token);
    const userData = await getUserData(token as string);
    profileForm.reset({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
    });
  }
  useEffect(() => {
    fetchToken();
  });

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
  });

  const handleProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token as string,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data.errors?.msg || data.message || "Error updating profile ❌";
        throw new Error(errorMessage);
      }

      toast.success("Profile updated successfully ✅", {
        position: "top-center",
        style: {
          background: "#0fcd60",
          color: "#fff",
        },
      });
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Error updating profile ❌",
        {
          position: "top-center",
          style: {
            background: "#db4444",
            color: "#fff",
          },
        }
      );
    }
  };

  const handlePasswordSubmit = async (
    values: z.infer<typeof passwordSchema>
  ) => {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: token as string,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          data.errors?.msg || data.message || "Error changing password ❌";
        throw new Error(errorMessage);
      }

      toast.success("Password changed successfully ✅", {
        position: "top-center",
        style: {
          background: "#0fcd60",
          color: "#fff",
        },
      });
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Error changing password ❌",
        {
          position: "top-center",
          style: {
            background: "#db4444",
            color: "#fff",
          },
        }
      );
    }
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Update Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
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
                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="btn">
                    Update Profile
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="password"
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
                  <FormField
                    control={passwordForm.control}
                    name="rePassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="btn">
                    Change Password
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

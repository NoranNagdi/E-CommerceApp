"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import Image from "next/image";
import sideImg from "@/Assets/Images/SideImage.png";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  signupFormState,
  SignupFormData,
  signupSchema,
} from "@/Schemas/signupSchema";
import Link from "next/link";
import { signUp } from "@/Services/Signup.Service";
import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function SignUp() {
  const [action, formAction, isPending] = useActionState(
    signUp,
    signupFormState
  );
  const router = useRouter();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (action) {
      if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-center",
          style: {
            background: "#db4444",
            color: "#fff",
          },
        });
      }
      if (action.success && action.message) {
        toast.success("Account Created Successfully", {
          position: "top-center",
          style: {
            background: "#0fcd60",
            color: "#fff",
          },
        });
        router.push("/login");
      }
    }
  }, [action, router]);
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-x-32 gap-y-16">
          <Image
            src={sideImg}
            alt="side image"
            width={600}
            height={300}
            className="mx-auto object-contain"
          />
          <div className="flex flex-col justify-center">
            <div>
              <h1 className="font-medium text-4xl my-4">Create an Account</h1>
              <p className="mb-10 font-light">Enter your details below.</p>
            </div>
            <Form {...form}>
              <form className="space-y-8" action={formAction}>
                {/********** Name Field **********/}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.name?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                {/********** Email Field **********/}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="username@domain.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{action.error?.email?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                {/********** Password Field **********/}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="***********"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{action.error?.password?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                {/**********Confirm Password Field **********/}
                <FormField
                  control={form.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="***********"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{action.error?.rePassword?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                {/********** Phone Field **********/}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+011 1234 5678"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>{action.error?.phone?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-4">
                  <Button type="submit" className="btn" disabled={isPending}>
                    {isPending ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      ""
                    )}
                    Create Account
                  </Button>
                  <div>
                    Already have an account?{" "}
                    <Link href="/login" className="underline font-semibold">
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

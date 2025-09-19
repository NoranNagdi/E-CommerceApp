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
import { LoginFormData, loginSchema } from "@/Schemas/loginSchema";
import Image from "next/image";
import sideImg from "@/Assets/Images/SideImage.png";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleLogin(values: LoginFormData) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (res?.ok) {
      toast.success("Logged in Successfully", {
        position: "top-center",
        style: {
          background: "#0fcd60",
          color: "#fff",
        },
      });
      router.push("/");
    } else {
      toast.error(res?.error || "Something went wrong", {
        position: "top-center",
        style: {
          background: "#db4444",
          color: "#fff",
        },
      });
    }
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16">
          <Image
            src={sideImg}
            alt="side image"
            width={600}
            height={300}
            className="mx-auto object-contain"
          />
          <div className="flex flex-col justify-center">
            <div>
              <h1 className="font-medium text-4xl my-4">Login to Exclusive</h1>
              <p className="mb-10 font-light">Enter your details below.</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-8"
              >
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <Button
                    type="submit"
                    className="btn"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      ""
                    )}
                    Login
                  </Button>
                  <Link href="/forgotpassword" className="text-main-color">
                    Forget Password?
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

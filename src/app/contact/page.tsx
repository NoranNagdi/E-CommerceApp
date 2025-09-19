"use client";

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
import { Separator } from "@/Components/ui/separator";
import { Textarea } from "@/Components/ui/textarea";
import { ContactFormData, contactSchema } from "@/Schemas/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Phone } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formState: ContactFormStateType = {
  success: false,
  error: {},
  message: null,
};

export type ContactFormStateType = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    phone?: string[];
    msg?: string[];
  };
  message: string | null;
};
export default function Contact() {
  function getContactData(formState: ContactFormStateType, formData: FormData) {
    const actualData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      msg: formData.get("msg"),
    };

    const parsedData = contactSchema.safeParse(actualData);
    if (!parsedData.success) {
      return {
        success: false,
        error: parsedData.error.flatten().fieldErrors,
        message: null,
      };
    } else {
      return {
        success: true,
        error: {},
        message: "Message Sent Successfully",
      };
    }
  }

  const [action, formAction, isPending] = useActionState(
    getContactData,
    formState
  );

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      msg: "",
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
        toast.success(action.message, {
          position: "top-center",
          style: {
            background: "#0fcd60",
            color: "#fff",
          },
        });
        form.reset();
      }
    }
  }, [action, form]);
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 p-10 shadow-sm rounded">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-full p-2 bg-main-color">
                  <Phone className="text-white" />
                </div>
                <h2 className="font-medium">Call Us</h2>
              </div>
              <p className="mb-4 font-light text-sm">
                We are available 24/7, 7 days a week.
              </p>
              <p className="font-light text-sm">Phone: +8801611112222</p>
            </div>
            <Separator className="my-8" />
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="rounded-full p-2 bg-main-color">
                  <Mail className="text-white" />
                </div>
                <h2 className="font-medium">Write To Us</h2>
              </div>
              <p className="mb-4 font-light text-sm">
                Fill out our form and we will contact you within 24 hours
              </p>
              <p className="font-light text-sm">
                Emails: customer@exclusive.com
              </p>
              <p className="font-light text-sm">
                Emails: support@exclusive.com
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 p-10 shadow-sm rounded">
            <Form {...form}>
              <form className="space-y-8" action={formAction}>
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                  {/********** Name Field **********/}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage>
                          {
                            (action.error as ContactFormStateType["error"])
                              ?.name?.[0]
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  {/********** Email Field **********/}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="username@domain.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            (action.error as ContactFormStateType["error"])
                              ?.email?.[0]
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  {/********** Phone Field **********/}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+011 1234 5678"
                            type="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {
                            (action.error as ContactFormStateType["error"])
                              ?.phone?.[0]
                          }
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>

                {/********** Phone Field **********/}
                <FormField
                  control={form.control}
                  name="msg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="mb-8 h-[10rem]"
                          placeholder="Your Message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {
                          (action.error as ContactFormStateType["error"])
                            ?.msg?.[0]
                        }
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" className="btn" disabled={isPending}>
                    {isPending ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      ""
                    )}
                    Send Message
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

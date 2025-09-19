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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  AddressFormData,
  addressFormState,
  addressSchema,
} from "@/Schemas/addressSchema";
import { Table, TableBody, TableCell, TableRow } from "@/Components/ui/table";
import { useCart } from "@/Context/CartContext";
import { formatPrice } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import visa from "@/Assets/Images/visa.png";
import mastercard from "@/Assets/Images/Mastercard.png";
import { handlePayment } from "@/Services/Checkout.Service";

export default function Checkout() {
  const [action, formAction, isPending] = useActionState(
    handlePayment,
    addressFormState
  );
  const router = useRouter();

  const { cartDetails, setCartDetails } = useCart();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      details: "",
      city: "",
      phone: "",
      cartId: "",
      paymentMethod: "cash",
    },
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
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
        if (action.paymentMethod === "cash") {
          toast.success(action.message, {
            position: "top-center",
            style: {
              background: "#0fcd60",
              color: "#fff",
            },
          });
          setCartDetails(null);
          timeout = setTimeout(() => {
            router.push(action.callbackURL || "/allorders");
          }, 2000);
        } else {
          window.location.href = action.callbackURL || "/cart";
        }
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [action, router, setCartDetails, form]);

  useEffect(() => {
    if (cartDetails) {
      form.setValue("cartId", cartDetails.cartId);
    }
  }, [cartDetails, form]);
  return (
    <section className="py-20">
      <div className="container">
        <h1 className="font-medium text-4xl mb-12">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <section>
            <Table className="mb-6 text-center">
              <TableBody>
                {cartDetails?.data.products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col lg:flex-row items-center gap-5">
                        <Image
                          src={product.product.imageCover}
                          alt={product.product.title}
                          width={54}
                          height={54}
                        />
                        <h2>
                          {product.count > 1 ? `${product.count} x ` : ""}{" "}
                          {product.product.title}
                        </h2>
                      </div>
                    </TableCell>

                    <TableCell>
                      ${formatPrice(product.price * product.count)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {cartDetails && (
              <div>
                <ul className="divide-y divide-gray-950">
                  <li className="py-6 flex justify-between">
                    <span>Subtotal</span>
                    <span>${formatPrice(cartDetails.data.totalCartPrice)}</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </li>
                  <li className="py-6 flex justify-between">
                    <span>Total</span>
                    <span>${formatPrice(cartDetails.data.totalCartPrice)}</span>
                  </li>
                </ul>
              </div>
            )}
          </section>

          <section className="flex flex-col">
            <Form {...form}>
              <form className="space-y-8" action={formAction}>
                {cartDetails && (
                  <FormField
                    control={form.control}
                    name="cartId"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          type="hidden"
                          {...field}
                          value={String(cartDetails?.cartId || "")}
                        />
                      </FormControl>
                    )}
                  />
                )}

                {/********** Address Details Field **********/}
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Shipping Address" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.details?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                {/********** City Field **********/}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: New York" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.city?.[0]}</FormMessage>
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
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          name={field.name}
                          className="flex flex-col"
                        >
                          <div className="flex justify-between">
                            <FormItem className="flex items-center gap-3">
                              <FormControl>
                                <RadioGroupItem value="card" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Card
                              </FormLabel>
                            </FormItem>
                            <div className="flex gap-3">
                              <Image
                                src={visa.src}
                                alt="visa"
                                width={25}
                                height={20}
                              />
                              <Image
                                src={mastercard.src}
                                alt="mastercard"
                                width={25}
                                height={20}
                              />
                            </div>
                          </div>

                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <RadioGroupItem value="cash" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Cash on Delivery
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage>
                        {action.error?.paymentMethod?.[0]}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="btn w-1/2"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      ""
                    )}
                    Place Order
                  </Button>
                </div>
              </form>
            </Form>
          </section>
        </div>
      </div>
    </section>
  );
}

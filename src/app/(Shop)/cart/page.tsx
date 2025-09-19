"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import Link from "next/link";
import { Input } from "@/Components/ui/input";
import { useCart } from "@/Context/CartContext";
import { Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { clearCart, removeFromCart, updateCart } from "@/Services/Cart.Service";
import { toast } from "sonner";
import ConfirmationModal from "@/Components/Shared/ConfirmationModal";

export default function Cart() {
  const { cartDetails, setCartDetails } = useCart();

  async function clearAllCart() {
    const res = await clearCart();
    if (res.message == "success") {
      toast.success("Cart Cleared Successfully", {
        position: "top-center",
        style: {
          background: "#0fcd60",
          color: "#fff",
        },
      });
      setCartDetails(null);
    } else {
      toast.error(res.message || "Something went wrong", {
        position: "top-center",
        style: {
          background: "#db4444",
          color: "#fff",
        },
      });
    }
  }
  async function removeProductFromCart(productId: string) {
    const res = await removeFromCart(productId);
    if (res.status === "success") {
      toast.success("Item Removed From Cart Successfully", {
        position: "top-center",
        style: {
          background: "#0fcd60",
          color: "#fff",
        },
      });
      setCartDetails(res);
    } else {
      toast.error(res.message || "Something went wrong", {
        position: "top-center",
        style: {
          background: "#db4444",
          color: "#fff",
        },
      });
    }
  }
  async function updateCartQty(productId: string, count: number) {
    const res = await updateCart(productId, count);
    if (res.status === "success") {
      toast.success("Quantity Updated Successfully", {
        position: "top-center",
        style: {
          background: "#0fcd60",
          color: "#fff",
        },
      });
      setCartDetails(res);
    } else {
      toast.error(res.message || "Something went wrong", {
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
        {cartDetails && cartDetails.numOfCartItems > 0 ? (
          <>
            <ConfirmationModal clearAllCart={clearAllCart} />

            <section className="mb-20">
              <Table className="mb-6 text-center">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Price</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-center">Subtotal</TableHead>
                    <TableHead className="text-center">Delete Item</TableHead>
                  </TableRow>
                </TableHeader>
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
                          <h2>{product.product.title}</h2>
                        </div>
                      </TableCell>
                      <TableCell>${formatPrice(product.price)}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            className="cursor-pointer"
                            variant={"outline"}
                            size={"sm"}
                            onClick={() =>
                              updateCartQty(
                                product.product._id,
                                product.count - 1
                              )
                            }
                          >
                            -
                          </Button>
                          {product.count}
                          <Button
                            className="cursor-pointer"
                            variant={"outline"}
                            size={"sm"}
                            onClick={() =>
                              updateCartQty(
                                product.product._id,
                                product.count + 1
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        ${formatPrice(product.price * product.count)}
                      </TableCell>
                      <TableCell>
                        <Trash2
                          className="mx-auto cursor-pointer"
                          onClick={() =>
                            removeProductFromCart(product.product._id)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between">
                <Button variant={"outline"}>
                  <Link href="/products">Return to Shop</Link>
                </Button>
                <Button variant={"default"} className="cursor-pointer">
                  Update Cart
                </Button>
              </div>
            </section>
            <section className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4 w-full lg:w-5/12">
                <Input placeholder="Coupon Code" />
                <Button className="btn">Apply Coupon</Button>
              </div>

              <div className="w-full lg:w-5/12 px-6 py-8 border-2 border-gray-950">
                <h3 className="text-xl font-bold mb-6">Cart Total</h3>
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

                <div className="flex justify-center">
                  <Link href="/checkout" className="btn">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center ">
              <h1 className="text-2xl font-semibold my-6">
                Your Cart is Empty
              </h1>
              <Link href="/products" className="btn">
                Return to Shop
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

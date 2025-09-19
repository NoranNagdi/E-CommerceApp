// app/orders/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import Image from "next/image";
import { getLoggedUserToken } from "@/lib/serverUtils";
import { getUserData } from "@/Services/UserData.Service";

type Order = {
  _id: string;
  shippingAddress: { details: string; phone: string; city: string };
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  user: { name: string; email: string; phone: string };
  cartItems: {
    count: number;
    price: number;
    product: {
      title: string;
      imageCover: string;
      brand: { name: string };
      category: { name: string };
    };
  }[];
  createdAt: string;
};

async function getOrders(): Promise<Order[]> {
  const token = await getLoggedUserToken();

  const userData = await getUserData(token as string);

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userData.decoded.id}`
  );

  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export default async function AllOrders() {
  const orders = await getOrders();

  if (!orders || orders.length === 0) {
    return (
      <section className="py-12 container">
        <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
        <p className="text-center text-gray-500">No orders found.</p>
      </section>
    );
  }

  return (
    <section className="py-12 container space-y-10">
      <h1 className="text-3xl font-semibold">My Orders</h1>

      {orders.map((order) => (
        <Card key={order._id} className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Order #{order._id}</span>
              <span className="text-lg font-medium">
                ${order.totalOrderPrice}
              </span>
            </CardTitle>
            <div className="text-sm text-gray-500 flex flex-col md:flex-row md:items-center gap-3 mt-2">
              <p>
                <strong>Payment:</strong>{" "}
                {order.paymentMethodType.toUpperCase()}
              </p>

              <div className="flex items-center gap-2">
                <strong>Status:</strong>
                <Badge
                  variant={order.isPaid ? "default" : "destructive"}
                  className={order.isPaid ? "bg-green-600" : ""}
                >
                  {order.isPaid ? "Paid" : "Unpaid"}
                </Badge>
                <Badge
                  variant={order.isDelivered ? "default" : "secondary"}
                  className={order.isDelivered ? "bg-green-600" : ""}
                >
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </Badge>
              </div>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.cartItems.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="flex items-center gap-3">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <span>{item.product.title}</span>
                    </TableCell>
                    <TableCell>{item.product.brand?.name}</TableCell>
                    <TableCell>{item.product.category?.name}</TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>${item.price * item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

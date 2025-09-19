"use client";

import Image from "next/image";
import { Card, CardContent } from "@/Components/ui/card";
import {
  Users,
  ShoppingBag,
  Smile,
  TrendingUp,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Features from "@/Components/Shared/Features";
import about from "@/Assets/Images/about-image.png";
import tom from "@/Assets/Images/image46.png";
import emma from "@/Assets/Images/image47.png";
import will from "@/Assets/Images/image48.png";

export default function About() {
  return (
    <section className="py-16">
      <div className="container mx-auto space-y-16">
        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-gray-600">
              Launched in 2015, Exclusive is South Asia’s premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by a wide range of tailored marketing, data, and service
              solutions, Exclusive has 10,500 sellers and 300 brands and serves
              3 million customers across the region.
            </p>
            <p className="text-gray-600">
              Exclusive has more than 1 million products to offer, growing at a
              very fast pace. Exclusive offers a diverse assortment in
              categories ranging from consumer goods.
            </p>
          </div>
          <div>
            <Image
              src={about}
              alt="Our Story"
              width={500}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Card className="py-6 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-500 group">
            <CardContent>
              <Users className="mx-auto h-8 w-8 mb-3 text-red-500 group-hover:text-white transition-colors duration-500" />
              <h3 className="text-xl font-bold">10.5k</h3>
              <p className="text-sm">Sellers active on our site</p>
            </CardContent>
          </Card>
          <Card className="py-6 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-500 group">
            <CardContent>
              <ShoppingBag className="mx-auto h-8 w-8 mb-3 text-red-500 group-hover:text-white transition-colors duration-500" />
              <h3 className="text-xl font-bold">33k</h3>
              <p className="text-sm">Monthly Product Sale</p>
            </CardContent>
          </Card>
          <Card className="py-6 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-500 group">
            <CardContent>
              <Smile className="mx-auto h-8 w-8 mb-3 text-red-500 group-hover:text-white transition-colors duration-500" />
              <h3 className="text-xl font-bold">45.5k</h3>
              <p className="text-sm">Customers active on our site</p>
            </CardContent>
          </Card>
          <Card className="py-6 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-500 group">
            <CardContent>
              <TrendingUp className="mx-auto h-8 w-8 mb-3 text-red-500 group-hover:text-white transition-colors duration-500" />
              <h3 className="text-xl font-bold">25k</h3>
              <p className="text-sm">Annual gross sale on site</p>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            {[
              {
                name: "Tom Cruise",
                role: "Founder & Chairman",
                img: tom,
              },
              {
                name: "Emma Watson",
                role: "Managing Director",
                img: emma,
              },
              {
                name: "Will Smith",
                role: "Product Designer",
                img: will,
              },
            ].map((member, i) => (
              <Card
                key={i}
                className="rounded-xl shadow-md flex flex-col items-center text-center h-[564px] hover:scale-110 transition-all duration-500"
              >
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={220}
                    height={250}
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-col items-center justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold mt-3">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <Twitter className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" />
                    <Instagram className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" />
                    <Linkedin className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}

        <Features />
      </div>
    </section>
  );
}

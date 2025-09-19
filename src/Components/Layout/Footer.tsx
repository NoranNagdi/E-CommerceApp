import {
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
  SendHorizontal,
  Twitter,
} from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import google from "@/Assets/Images/googleplay.png";
import apple from "@/Assets/Images/appstore.png";
import qr from "@/Assets/Images/qrcode.png";

export default function Footer() {
  return (
    <>
      <section className="py-20 bg-black text-white">
        <div className="container">
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            <div>
              <h1 className="font-bold text-2xl mb-6">Exclusive</h1>
              <h3 className="font-semibold text-xl mb-6">Subscribe</h3>
              <p className="font-light mb-4">Get 10% off your first order</p>
              <div className="relative">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="rounded-xs border border-white"
                />
                <SendHorizontal className="absolute top-1/2 right-3 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-6">Support</h2>
              <p className="font-light mb-4">
                111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
              </p>
              <p className="font-light mb-4">exclusive@gmail.com</p>
              <p className="font-light mb-4">+88015-88888-9999</p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-6">Account</h2>
              <p className="font-light mb-4">My Account</p>
              <p className="font-light mb-4">Login/Register</p>
              <p className="font-light mb-4">Cart</p>
              <p className="font-light mb-4">Wishlist</p>
              <p className="font-light mb-4">Shop</p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-6">Quick Link</h2>
              <p className="font-light mb-4">Privacy Policy</p>
              <p className="font-light mb-4">Terms of Use</p>
              <p className="font-light mb-4">FAQ</p>
              <p className="font-light mb-4">Contact</p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-6">Download App</h2>
              <p className="text-xs font-medium text-gray-500 mb-2">
                Save $3 with App New User Only
              </p>
              <div>
                <div className="flex gap-2 mb-6">
                  <Image src={qr.src} alt="QR Code" width={80} height={80} />
                  <div className="flex flex-col gap-2">
                    <Image
                      src={google.src}
                      alt="google-play"
                      width={110}
                      height={40}
                    />
                    <Image
                      src={apple.src}
                      alt="app-store"
                      width={110}
                      height={40}
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <Facebook />
                  <Twitter />
                  <Instagram />
                  <Linkedin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="flex justify-center items-center gap-2 pt-4 pb-6 border-t border-gray-800 font-light text-gray-700">
          <Copyright /> <p> Copyright Rimel 2022. All right reserved</p>
        </div>
      </section>
    </>
  );
}

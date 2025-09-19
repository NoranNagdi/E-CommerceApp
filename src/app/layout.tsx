import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "swiper/css";
import "swiper/css/pagination";
import "./globals.css";
import Navbar from "@/Components/Layout/Nav";
import Footer from "@/Components/Layout/Footer";
import { Toaster } from "@/Components/ui/sonner";
import Providers from "@/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}  antialiased`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

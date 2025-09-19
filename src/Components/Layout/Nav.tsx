"use client";

import logo from "@/Assets/Images/logo.png";
import { Heart, MenuIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { Separator } from "@/Components/ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "@/Components/ui/badge";
import { useCart } from "@/Context/CartContext";
import { useWishlist } from "@/Context/WishlistContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { User, ShoppingBag, LogOut } from "lucide-react";
import userPhoto from "@/Assets/Images/user.png";

const links = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/products",
    label: "Products",
  },
  {
    path: "/categories",
    label: "Categories",
  },
  {
    path: "/brands",
    label: "Brands",
  },
  {
    path: "/about",
    label: "About",
  },
  {
    path: "/contact",
    label: "Contact Us",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const { cartDetails } = useCart();
  const { wishlistDetails } = useWishlist();

  return (
    <>
      <div className="text-center bg-black text-white py-4 text-sm">
        <span className="font-light">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <Link href="/products" className="underline font-semibold">
            ShopNow
          </Link>
        </span>
      </div>
      <section className="pb-4 pt-10">
        <div className="container">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} alt="logo" className="w-10 h-10" />
              <span className="text-2xl font-semibold tracking-tighter">
                Exclusive
              </span>
            </Link>
            <NavigationMenu className="hidden lg:block">
              <NavigationMenuList>
                {links.map((link) => (
                  <NavigationMenuItem key={link.path}>
                    <NavigationMenuLink
                      href={link.path}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === link.path && "text-main-color"
                      )}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="hidden items-center gap-4 lg:flex">
              {status === "unauthenticated" ? (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/wishlist" className="relative">
                    {wishlistDetails && (
                      <Badge
                        className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums position absolute -top-1/2 -end-1/2"
                        variant="destructive"
                      >
                        {wishlistDetails.count}
                      </Badge>
                    )}
                    <Heart className="size-8 cursor-pointer" />
                  </Link>
                  <Link href="/cart" className="relative">
                    {cartDetails && (
                      <Badge
                        className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums position absolute -top-1/2 -end-1/2"
                        variant="destructive"
                      >
                        {cartDetails.numOfCartItems}
                      </Badge>
                    )}
                    <ShoppingCart className="size-8 cursor-pointer" />
                  </Link>
                  {session?.user && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Image
                          src={userPhoto}
                          alt="user"
                          className="w-8 h-8 rounded-full cursor-pointer"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>
                            <span className="font-semibold block">
                              {session?.user?.name}
                            </span>
                            <span className="font-light block">
                              {session?.user?.email}
                            </span>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem className="cursor-pointer">
                            <Link href="/profile">Manage My Account</Link>
                            <DropdownMenuShortcut>
                              <User />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Link href="/allorders">My Orders</Link>
                            <DropdownMenuShortcut>
                              <ShoppingBag />
                            </DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="cursor-pointer text-main-color hover:!text-red-700"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          Sign out
                          <DropdownMenuShortcut>
                            <LogOut />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </>
              )}
            </div>

            <Sheet>
              <div className="flex gap-4 lg:hidden ms-auto me-4">
                <Link href="/wishlist" className="relative">
                  {wishlistDetails && (
                    <Badge
                      className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums position absolute -top-1/2 -end-1/2"
                      variant="destructive"
                    >
                      {wishlistDetails.count}
                    </Badge>
                  )}
                  <Heart className="size-8 cursor-pointer" />
                </Link>
                <Link href="/cart" className="relative">
                  {cartDetails && (
                    <Badge
                      className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums position absolute -top-1/2 -end-1/2"
                      variant="destructive"
                    >
                      {cartDetails.numOfCartItems}
                    </Badge>
                  )}
                  <ShoppingCart className="size-8 cursor-pointer" />
                </Link>
              </div>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <MenuIcon className="size-4 cursor-pointer" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="max-h-screen overflow-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <span className="text-lg font-semibold tracking-tighter">
                        Exclusive
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4">
                  <div className="flex flex-col gap-6">
                    {links.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className={cn(
                          "font-medium",
                          pathname === link.path && "text-main-color"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-4">
                    {status === "unauthenticated" ? (
                      <>
                        <Button variant="outline" asChild>
                          <Link href="/login">Sign In</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="flex gap-4">
                          <Button variant="outline" asChild className="w-1/2">
                            <Link href="/profile">Profile</Link>
                          </Button>
                          <Button variant="outline" asChild className="w-1/2">
                            <Link href="/allorders">My Orders</Link>
                          </Button>
                        </div>
                        <Button
                          className="btn"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          Sign Out
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </section>
      <Separator />
    </>
  );
}

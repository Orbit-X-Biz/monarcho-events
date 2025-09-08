"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="bg-[#E5E0DA] rounded-lg mt-4 mx-4 pr-2 sm:pr-8 pl-4 py-4 flex justify-between items-center h-14 sm:h-20 relative">
      <Link href="/" className="flex items-center cursor-pointer">
        {/* Mobile Logo */}
        <Image
          className="sm:hidden"
          src="/assets/logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
        {/* Desktop Logo */}
        <Image
          className="hidden md:flex"
          src="/assets/logo.png"
          alt="Logo"
          width={90}
          height={90}
        />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link
          href="/"
          className="hover:underline cursor-pointer font-normal text-base"
        >
          Services
        </Link>

        <Link
          href="/"
          className="hover:underline cursor-pointer font-normal text-base"
        >
          Testimonials
        </Link>

        <Link
          href="/"
          className="hover:underline cursor-pointer font-normal text-base"
        >
          About Us
        </Link>

        <Link
          href="/"
          className="hover:underline cursor-pointer font-normal text-base"
        >
          Contact Us
        </Link>

        <Link
          href="/"
          className="bg-[#926B48] px-8 py-2 font-semibold text-sm text-white rounded-md cursor-pointer"
        >
          Book Now
        </Link>
      </div>

      {/* Hamburger Menu with Sheet */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <Menu className="w-6 h-w-6 text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-[#E5E0DA] w-[150px] sm:w-[300px]"
          >
            <SheetHeader></SheetHeader>
            <div className="flex flex-col gap-4 mt-2 items-end pr-4.5">
              <Link
                href="/"
                className="hover:underline cursor-pointer font-normal text-sm"
              >
                Services
              </Link>

              <Link
                href="/"
                className="hover:underline cursor-pointer font-normal text-sm"
              >
                Testimonials
              </Link>

              <Link
                href="/"
                className="hover:underline cursor-pointer font-normal text-sm"
              >
                About Us
              </Link>

              <Link
                href="/"
                className="hover:underline cursor-pointer font-normal text-sm"
              >
                Contact Us
              </Link>

              <Link
                href="/"
                className="bg-[#926B48] px-6 py-2 font-semibold text-xs text-white rounded-md cursor-pointer"
              >
                Book Now
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

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
          quality={100}
        />
        {/* Desktop Logo */}
        <Image
          className="hidden md:flex"
          src="/assets/logo.png"
          alt="Logo"
          width={90}
          height={90}
          quality={100}
        />
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center">
        {/* Services with dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <p className="hover:underline cursor-pointer font-normal text-base flex items-center">
            Services
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </p>

          {/* Dropdown menu */}
          {isServicesOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-md border z-50">
              <div className="py-2">
                <Link
                  href="/our-services/life-celebrations"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#926B48]"
                >
                  Life Celebrations
                </Link>
                <Link
                  href="/our-services/entertainment"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#926B48]"
                >
                  Entertainment & Music Events
                </Link>
                <Link
                  href="/our-services/traditional"
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 hover:text-[#926B48]"
                >
                  Cultural & Traditional Events
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link
          href="/gallery"
          className="hover:underline cursor-pointer font-normal text-base"
        >
          Gallery
        </Link>

        <Link
          href="/about-us"
          className="hover:underline cursor-pointer font-normal text-base"
        >
          About Us
        </Link>

        <Link
          href="/contact-us"
          className="hover:underline cursor-pointer font-normal text-base"
        >
          Contact Us
        </Link>

        <Link
          href="/contact-us"
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
                href="/our-services/life-celebrations"
                className="hover:underline cursor-pointer font-normal text-sm"
              >
                Life Celebrations
              </Link>

              <Link
                href="/our-services/entertainment"
                className="hover:underline cursor-pointer font-normal text-sm"
              >
                Entertainment
              </Link>

              <Link
                href="/our-services/traditional"
                className="hover:underline cursor-pointer font-normal text-sm"
              >
                Cultural
              </Link>

              <Link
                href="/gallery"
                className="hover:underline cursor-pointer font-normal text-sm"
              >
                Gallery
              </Link>

              <Link
                href="/about-us"
                className="hover:underline cursor-pointer font-normal text-sm"
              >
                About Us
              </Link>

              <Link
                href="/contact-us"
                className="hover:underline cursor-pointer font-normal text-sm"
              >
                Contact Us
              </Link>

              <Link
                href="/contact-us"
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

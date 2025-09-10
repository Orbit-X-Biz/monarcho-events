"use client";
import { STRINGS } from "@/constants/STRINGS";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* Mobile view footer */}
      <div className="sm:hidden bg-[#D6C6B7] py-6 flex flex-col items-center">
        {/* Logo */}
        <Image
          className="sm:hidden"
          src="/assets/bg-white-logo.jpg"
          alt="Logo"
          width={120}
          height={120}
        />

        {/* Company Details */}
        <div className="my-2 text-center space-y-1.5 text-[#926B48]">
          <h2 className="font-semibold text-xl">Monarcho Events</h2>
          <p className="font-light text-sm">{STRINGS.address}</p>
          <p className="font-light text-sm">
            <a href={`tel:${STRINGS.contactNo}`} className="hover:underline">
              {STRINGS.contactNo}
            </a>
          </p>
          <p className="font-light text-sm">
            <a href={`mailto:${STRINGS.email}`} className="hover:underline">
              {STRINGS.email}
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div className="my-4 text-center flex flex-col">
          <Link
            href="/"
            className="hover:underline cursor-pointer font-normal text-sm"
          >
            Bookings
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
        </div>

        {/* Social Media */}
        <div className="flex flex-row space-x-4 items-center my-2">
          <a href={STRINGS.fbLink} target="_blank">
            <Image
              src="/assets/facebook.png"
              alt="Facebook"
              width={25}
              height={25}
            />
          </a>
          <a href={STRINGS.instaLink} target="_blank">
            <Image
              src="/assets/instagram.png"
              alt="Instagram"
              width={22}
              height={22}
            />
          </a>
          <a href={STRINGS.tiktokLink} target="_blank">
            <Image
              src="/assets/tiktok.png"
              alt="TikTok"
              width={25}
              height={25}
            />
          </a>
          <a href={STRINGS.whatsappLink} target="_blank">
            <Image
              src="/assets/whatsapp.png"
              alt="Whatsapp"
              width={21}
              height={21}
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-black text-xs font-extralight mt-5 px-3 italic">
          © {new Date().getFullYear()} Monarcho Events. All rights reserved.
          Designed & Developed by{" "}
          <a
            href="https://www.orbitx.biz/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline cursor-pointer"
          >
            OrbitX
          </a>
        </div>
      </div>

      {/* Desktop view footer */}
      <div className="hidden md:flex flex-col bg-[#D6C6B7] py-6 px-16 w-full ">
        <div className="flex flex-row items-center justify-between">
          {/* Logo and company details */}
          <div className="flex flex-row items-center space-x-4">
            <div>
              <Image
                className=""
                src="/assets/bg-white-logo.jpg"
                alt="Logo"
                width={120}
                height={120}
              />
            </div>
            <div className="flex flex-col space-y-3 text-[#926B48]">
              <h2 className="font-semibold text-xl">Monarcho Events</h2>
              <p className="font-light text-sm">{STRINGS.address}</p>
              <p className="font-light text-sm">
                <a
                  href={`tel:${STRINGS.contactNo}`}
                  className="hover:underline"
                >
                  {STRINGS.contactNo}
                </a>
              </p>
              <p className="font-light text-sm">
                <a href={`mailto:${STRINGS.email}`} className="hover:underline">
                  {STRINGS.email}
                </a>
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col space-y-4 text-center">
            <Link
              href="/"
              className="hover:underline cursor-pointer font-normal text-sm"
            >
              Bookings
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
          </div>

          {/* Social media link */}
          <div className="flex flex-col space-y-5">
            <a
              href={STRINGS.fbLink}
              target="_blank"
              className="flex flex-row space-x-2"
            >
              <Image
                src="/assets/facebook.png"
                alt="Facebook"
                width={25}
                height={25}
              />
              <p>Facebook</p>
            </a>
            <a
              href={STRINGS.instaLink}
              target="_blank"
              className="flex flex-row space-x-2"
            >
              <Image
                src="/assets/instagram.png"
                alt="Instagram"
                width={22}
                height={22}
              />
              <p>Instagram</p>
            </a>
            <a
              href={STRINGS.tiktokLink}
              target="_blank"
              className="flex flex-row space-x-2"
            >
              <Image
                src="/assets/tiktok.png"
                alt="TikTok"
                width={25}
                height={25}
              />
              <p>Tiktok</p>
            </a>
            <a
              href={STRINGS.whatsappLink}
              target="_blank"
              className="flex flex-row space-x-2"
            >
              <Image
                src="/assets/whatsapp.png"
                alt="Whatsapp"
                width={21}
                height={21}
              />
              <p>{STRINGS.whatsappNo}</p>
            </a>
          </div>
        </div>
        {/* Copyright claim */}
        <div className="text-center text-black text-base font-extralight mt-5 px-3 italic">
          © {new Date().getFullYear()} Monarcho Events. All rights reserved.
          Designed & Developed by{" "}
          <a
            href="https://www.orbitx.biz/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline cursor-pointer"
          >
            OrbitX
          </a>
        </div>
      </div>
    </>
  );
}

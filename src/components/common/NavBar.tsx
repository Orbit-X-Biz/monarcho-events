"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-[#E5E0DA] rounded-lg mt-4 mx-4 pr-2 sm:pr-8 pl-4 py-4 flex justify-between items-center h-14 sm:h-20 relative">
      <Link href="/" className="flex items-center cursor-pointer">
        {/* Mobile Logo */}
        <Image
          className="sm:hidden"
          src="/assets/logo.png"
          alt="Logo"
          width={30}
          height={30}
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
      <div className="hidden md:flex space-x-6">
        <button className="hover:underline cursor-pointer font-normal text-base">
          Services
        </button>

        <button className="hover:underline cursor-pointer font-normal text-base">
          Testimonials
        </button>

        <button className="hover:underline cursor-pointer font-normal text-base">
          About Us
        </button>

        <button className="hover:underline cursor-pointer font-normal text-base">
          Contact Us
        </button>

        <button className="bg-[#926B48] px-8 py-2 font-semibold text-sm text-white rounded-md cursor-pointer">
          Book Now
        </button>
      </div>
    </nav>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const sliderImages = ["/assets/slide1.JPG", "/assets/slide2.JPG"];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev: number) => (prev + 1) % sliderImages.length);
    }, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Full-width image slider with no margins */}
      <div className="relative overflow-hidden h-[400px] sm:h-screen w-full">
        {sliderImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            quality={100} // higher quality for banners
            className={`absolute object-cover transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            priority={index === 0}
          />
        ))}

        {/* Text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <h1 className="text-2xl sm:text-[45px] font-semibold  text-white">
            MONARCHO EVENTS
          </h1>
          <h1 className="text-3xl sm:text-6xl font-semibold mt-2 sm:mt-5 lovers-quarrel-regular text-white">
            “Where moments take flight”
          </h1>
          <Link
            href="/"
            className="bg-[#926B48] mt-10 px-6 sm:px-10 py-2 font-semibold text-xs sm:text-sm text-white rounded-md cursor-pointer"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}

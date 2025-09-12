"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
          <div className="text-center">
            <motion.h1
              className="text-2xl sm:text-[45px] font-semibold text-white"
              initial={{ opacity: 0, x: -50 }} // fade in from left
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              MONARCHO EVENTS
            </motion.h1>

            <motion.h1
              className="text-3xl sm:text-6xl font-semibold mt-2 sm:mt-5 lovers-quarrel-regular text-white"
              initial={{ opacity: 0, x: 50 }} // fade in from right
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              “Where moments take flight”
            </motion.h1>
          </div>
          <div className="mt-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 1, // show after hero text
              }}
            >
              <Link
                href="/"
                className="bg-[#926B48] mt-10 px-6 sm:px-10 py-2 font-semibold text-xs sm:text-sm text-white rounded-md cursor-pointer hover:scale-105 transition-transform"
              >
                Book Now
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* What we do content */}
      <div className="mt-10 mb-8 mx-8 sm:mx-16 text-center bg-[#D6C6B7] p-5 sm:py-5 sm:px-16">
        <h1 className="font-bold text-2xl sm:text-4xl text-[#926B48] mb-4">
          What We Do
        </h1>
        <p className="font-light text-sm sm:text-xl text-[#926B48]">
          At Monarcho Events, we transform life’s most cherished moments into
          luxury experiences that you’ll treasure forever. As a premier event
          planning and destination management company, we specialize in creating
          elegant weddings, bespoke proposals, corporate gatherings, and grand
          cultural celebrations. Our expert planners combine creativity,
          precision, and a signature touch of royalty to ensure that every
          detail is flawlessly executed and uniquely reflects your story.
          Whether you’re dreaming of an intimate celebration or a large-scale
          event, Monarcho Events brings sophistication, personalization, and
          unforgettable memories to every occasion.
        </p>
      </div>
    </>
  );
}

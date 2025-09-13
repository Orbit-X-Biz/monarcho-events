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

      {/* Our services component */}
      <div className="flex flex-col">
        <h1 className="text-center mb-5 font-semibold text-[#926B48] text-2xl sm:text-3xl">
          Our Services
        </h1>

        {/* Service cards */}
        <div className="flex flex-col space-y-3">
          {/* Service cards - Life Celebrations*/}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 bg-[#E5E0DA]">
            {/* Image */}
            <div className="relative w-full sm:w-2/6 h-[300px] sm:h-auto">
              <Image
                src="/assets/services-life.png"
                alt="Life Services"
                fill
                style={{ objectFit: "cover" }}
                quality={100}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col space-y-4 text-center px-3 sm:ml-10 sm:justify-center sm:items-start sm:w-full py-4">
              <h1 className="font-normal mt-2 text-[#926B48] text-xl sm:text-2xl">
                Life Celebrations
              </h1>
              <p className="font-normal text-sm sm:text-base text-center sm:text-left">
                Celebrate life’s milestones in style with us. From weddings,
                proposals, and engagements to anniversaries, birthdays, baby
                showers, and bachelor/bachelorette parties, we bring your vision
                to life with elegance and creativity. Whether you dream of a
                luxury wedding, cultural tradition, boho-inspired setup, or a
                custom theme, our team handles everything : venue, décor,
                entertainment, and coordination; so you can enjoy unforgettable
                moments stress-free.
              </p>
              <Link
                href="/"
                className="bg-[#926B48] sm:mt-8 self-center sm:self-start w-fit mb-4 px-6 sm:px-10 py-2 font-semibold text-xs sm:text-sm text-white rounded-md cursor-pointer hover:scale-105 transition-transform"
              >
                More Info
              </Link>
            </div>
          </div>

          {/* Service cards - Entertainment & Music Events*/}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 bg-[#E5E0DA]">
            {/* Image */}
            <div className="relative w-full sm:w-2/6 h-[300px] sm:h-auto">
              <Image
                src="/assets/services-music.png"
                alt="Life Services"
                fill
                style={{ objectFit: "cover" }}
                quality={100}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col space-y-4 text-center px-3 sm:ml-10 sm:justify-center sm:items-start sm:w-full py-4">
              <h1 className="font-normal mt-2 text-[#926B48] text-xl sm:text-2xl">
                Entertainment & Music Events
              </h1>
              <p className="font-normal text-sm sm:text-base text-center sm:text-left">
                Turn up the energy with Monarcho Events’ music experiences. From
                concerts and festivals to DJ nights and live performances, we
                curate unforgettable events that bring people together through
                sound and atmosphere. With expert stage design, sound
                engineering, and artist bookings, our team ensures every show is
                seamlessly produced and full of life, whether it’s an intimate
                lounge vibe or a large-scale concert.
              </p>
              <Link
                href="/"
                className="bg-[#926B48] sm:mt-8 self-center sm:self-start w-fit mb-4 px-6 sm:px-10 py-2 font-semibold text-xs sm:text-sm text-white rounded-md cursor-pointer hover:scale-105 transition-transform"
              >
                More Info
              </Link>
            </div>
          </div>

          {/* Service cards - Cultural & Traditional Events*/}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 bg-[#E5E0DA]">
            {/* Image */}
            <div className="relative w-full sm:w-2/6 h-[300px] sm:h-auto">
              <Image
                src="/assets/services-cultural.png"
                alt="Life Services"
                fill
                style={{ objectFit: "cover" }}
                quality={100}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col space-y-4 text-center px-3 sm:ml-10 sm:justify-center sm:items-start sm:w-full py-4">
              <h1 className="font-normal mt-2 text-[#926B48] text-xl sm:text-2xl">
                Cultural & Traditional Events
              </h1>
              <p className="font-normal text-sm sm:text-base text-center sm:text-left">
                Celebrate heritage with Monarcho Events’ cultural experiences.
                From festivals and traditional performances to community
                celebrations, we craft events that honor authenticity while
                creating meaningful memories. Working with cultural artists and
                community leaders, our shows bring together music, dance,
                storytelling, and tradition in vibrant, unforgettable ways.
              </p>
              <Link
                href="/"
                className="bg-[#926B48] sm:mt-8 self-center sm:self-start w-fit mb-4 px-6 sm:px-10 py-2 font-semibold text-xs sm:text-sm text-white rounded-md cursor-pointer hover:scale-105 transition-transform"
              >
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why choose Monarcho component */}
      <div className="flex flex-col my-10">
        <h1 className="text-[#926B48] font-semibold text-xl sm:text-3xl text-center">
          Why Choose Monarcho Events?
        </h1>
        <div className="flex flex-col space-y-5 px-4 sm:px-10 mt-4 sm:mt-8 text-sm sm:text-base">
          <p className="font-light">
            When it comes to creating unforgettable celebrations, Monarcho
            Events stands out as one of the leading event planners in Sri Lanka.
            We combine creativity, cultural understanding, and flawless
            execution to make every occasion extraordinary. Here’s why clients
            trust us:
          </p>
          <ul className="list-disc ml-5 marker:text-[#926B48]">
            <li className="font-light">
              <span className="text-[#926B48] !font-semibold">
                End to End Event Planning
              </span>{" "}
              – From concept to completion, we manage every detail of your event
              with precision.
            </li>
            <li className="font-light">
              <span className="text-[#926B48] !font-semibold">
                Personalized Styling & Design
              </span>{" "}
              – Our team curates unique themes and designs that reflect your
              vision and personality.
            </li>
            <li className="font-light">
              <span className="text-[#926B48] !font-semibold">
                Exclusive Vendor Partnerships
              </span>{" "}
              – We collaborate with trusted venues, caterers, entertainers, and
              service providers to deliver premium experiences.
            </li>
            <li className="font-light">
              <span className="text-[#926B48] !font-semibold">
                Cultural Sensitivity & Inclusion
              </span>{" "}
              – Whether it’s a traditional Sri Lankan wedding, cultural
              festival, or international event, we respect and honor every
              tradition.
            </li>
            <li className="font-light">
              <span className="text-[#926B48] !font-semibold">
                Stress Free Coordination & Execution
              </span>{" "}
              – Sit back and enjoy while we handle timelines, logistics, and on
              the day coordination seamlessly.
            </li>
          </ul>
          <p className="font-light">
            With Monarcho Events, your celebration isn’t just planned, it’s
            thoughtfully designed to create lasting memories.
          </p>
        </div>
      </div>
    </>
  );
}

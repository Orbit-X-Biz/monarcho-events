import Image from "next/image";

//http://localhost:3000/our-services/traditional
export default function Traditional() {
  return (
    <>
      {/* Blank div for navbar */}
      <div className="h-20 sm:h-24"></div>
      {/* Main info component */}
      <div className="mt-4 sm:mt-8 flex flex-col">
        <h1 className="text-[#926B48] text-center font-semibold text-2xl sm:text-4xl">
          Cultural & Traditional Events
        </h1>
        <div className="flex sm:flex-row">
          <div className="sm:w-[90%] mt-2 sm:mt-4 px-3 sm:pl-6 text-[#926B48] text-justify font-light text-sm sm:text-xl">
            <p>
              At Monarcho Events, we believe culture is the heartbeat of
              identity. That’s why we design and manage cultural and traditional
              events that celebrate heritage while delivering a seamless, modern
              experience. From Sri Lankan heritage festivals and traditional
              dance performances to community cultural celebrations, our team
              ensures every detail is authentic, immersive, and unforgettable.
            </p>
            <br />
            <p>
              We work closely with cultural performers, local artists, and
              community leaders to create events that are vibrant, respectful,
              and emotionally resonant. Whether it’s a school cultural program,
              a corporate cultural night, or a grand community celebration, we
              curate experiences that honor tradition while engaging today’s
              audiences.
            </p>
          </div>
          {/* Image in the desktop view */}
          <div className="hidden sm:flex w-[10%] h-auto relative">
            <Image
              src="/assets/traditional-intro.png"
              alt="Entertainment & Music Events"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </div>
        </div>
        <h1 className="mt-4 sm:mt-6 px-3 sm:px-6 text-[#926B48] text-justify font-medium text-sm sm:text-xl">
          Explore the occasions we turn into timeless memories under our
          Cultural & Traditional Events service:
        </h1>
      </div>

      {/* Cultural Shows */}
      <div className="mt-5 sm:mx-6 mb-5">
        {/* Main Cultural Shows details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/cultural-banner-mobile.png"
              alt="Cultural Shows"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/cultural-banner.png"
              alt="Cultural Shows"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-8 sm:py-12 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                Cultural Shows
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Step into a world of color, rhythm, and heritage with our
                Cultural Shows in Sri Lanka. These performances bring together
                traditional music, dance, and storytelling to create a powerful
                expression of culture. Perfect for festivals, community
                gatherings, universities, or corporate events, our shows
                highlight the richness of tradition while offering an engaging
                and memorable experience for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

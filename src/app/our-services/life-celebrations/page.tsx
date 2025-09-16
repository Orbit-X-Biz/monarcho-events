import Image from "next/image";

//http://localhost:3000/our-services/life-celebrations
export default function LifeCelebrationPage() {
  return (
    <>
      {/* Blank div for navbar */}
      <div className="h-20 sm:h-24"></div>
      {/* Main info component */}
      <div className="mt-4 sm:mt-8 flex flex-col">
        <h1 className="text-[#926B48] text-center font-semibold text-2xl sm:text-4xl">
          Life Celebrations
        </h1>
        <div className="flex sm:flex-row">
          <div className="sm:w-[90%] mt-2 sm:mt-4 px-3 sm:pl-6 text-[#926B48] text-justify font-light text-sm sm:text-xl">
            <p>
              At Monarcho Events, we believe that life’s milestones deserve to
              be celebrated in style. Whether you’re planning an intimate
              gathering, a luxury wedding, or a grand cultural celebration, our
              Life Celebrations service provides complete event planning and
              coordination tailored to your vision.
            </p>
            <br />
            <p>
              From concept design to flawless execution, our team ensures every
              detail reflects your unique story. We offer personalized planning,
              venue sourcing, bespoke décor styling, entertainment management,
              and theme customization to create an event as memorable as the
              moments you’re honouring.
            </p>
            <br />
            <p>
              With Monarcho Events, your celebration isn’t just planned, it’s
              crafted into an unforgettable experience that truly reflects who
              you are.
            </p>
          </div>
          {/* Image in the desktop view */}
          <div className="hidden sm:flex w-[10%] h-auto relative">
            <Image
              src="/assets/life-celebrations-intro.png"
              alt="Life Services"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </div>
        </div>
        <h1 className="mt-4 sm:mt-6 px-3 sm:px-6 text-[#926B48] text-justify font-medium text-sm sm:text-xl">
          Explore the occasions we turn into timeless memories under our Life
          Celebrations service:
        </h1>
      </div>

      {/* Wedding packages component */}
      <div className="mt-5 ">
        {/* Main wedding details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px]">
            <Image
              src="/assets/wedding-banner-mobile.png"
              alt="Weddings"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-4 px-4 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl">
                Weddings
              </h1>
              <p className="text-sm mt-4 font-normal">
                Your wedding day should be nothing short of extraordinary. At
                Monarcho Events, we specialize in creating luxury weddings in
                Sri Lanka and beyond, designed to be elegant, personalized, and
                completely stress-free. Whether you dream of a grand destination
                wedding, a traditional cultural ceremony, or a whimsical
                boho-style celebration, we tailor every detail to reflect your
                unique love story.
              </p>
              <p className="text-sm font-light mt-4">
                Wedding Themes We Offer:
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

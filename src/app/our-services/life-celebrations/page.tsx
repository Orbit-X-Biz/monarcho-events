import Image from "next/image";

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
    </>
  );
}

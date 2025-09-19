import Image from "next/image";

//http://localhost:3000/our-services/entertainment
export default function LifeCelebrationPage() {
  return (
    <>
      {/* Blank div for navbar */}
      <div className="h-20 sm:h-24"></div>
      {/* Main info component */}
      <div className="mt-4 sm:mt-8 flex flex-col">
        <h1 className="text-[#926B48] text-center font-semibold text-2xl sm:text-4xl">
          Entertainment & Music Events
        </h1>
        <div className="flex sm:flex-row">
          <div className="sm:w-[90%] mt-2 sm:mt-4 px-3 sm:pl-6 text-[#926B48] text-justify font-light text-sm sm:text-xl">
            <p>
              At Monarcho Events, we know that music and entertainment are the
              heartbeat of every unforgettable celebration. Whether it’s a
              high-energy DJ night, a soulful live performance, or a large-scale
              concert, we specialize in curating and producing entertainment
              events that captivate audiences and keep the energy alive from
              start to finish.
            </p>
            <br />
            <p>
              Our team handles every detail—stage design, sound engineering,
              lighting, artist bookings, and crowd management—with creativity
              and precision. Whether you’re a music lover, a sponsor, or an
              artist, our entertainment events are designed to leave lasting
              impressions and unforgettable memories.
            </p>
          </div>
          {/* Image in the desktop view */}
          <div className="hidden sm:flex w-[10%] h-auto relative">
            <Image
              src="/assets/entertainment-intro.png"
              alt="Entertainment & Music Events"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </div>
        </div>
        <h1 className="mt-4 sm:mt-6 px-3 sm:px-6 text-[#926B48] text-justify font-medium text-sm sm:text-xl">
          Explore the occasions we turn into timeless memories under our
          Entertainments & Music Events service:
        </h1>
      </div>

      {/* Concerts */}
      <div className="mt-5 sm:mx-6">
        {/* Main Concerts details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/concerts-banner-mobile.png"
              alt="Concerts"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/concerts-banner.png"
              alt="Concerts"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-8 sm:py-12 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                Concerts
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Bring the magic of live concerts to life with Monarcho Events.
                From intimate gigs to festival style performances, we manage
                everything; artist coordination, logistics, stage setup, and
                live production. Whether it’s under the stars or in a grand
                concert hall, our concerts are immersive, electrifying, and
                flawlessly executed to suit both small gatherings and
                large-scale audiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DJ Nights & Live Music Events */}
      <div className="mt-5 sm:mx-6 mb-5">
        {/* Main DJ Nights & Live Music Events details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/dj-banner-mobile.png"
              alt="DJ Nights & Live Music Events"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/dj-banner.png"
              alt="DJ Nights & Live Music Events"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-8 sm:py-12 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                DJ Nights & Live Music Events
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Looking for the ultimate night out? Our DJ Nights and Live Music
                Events are designed for music lovers who crave unforgettable
                vibes. From beach parties and rooftop lounges to high-end clubs,
                we collaborate with top DJs and live performers to create the
                perfect atmosphere. Expect great beats, trendsetting themes, and
                an energy that keeps the crowd moving all night long.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

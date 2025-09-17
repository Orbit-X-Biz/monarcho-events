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
      <div className="mt-5 sm:mx-6">
        {/* Main wedding details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/wedding-banner-mobile.png"
              alt="Weddings"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/wedding-banner.png"
              alt="Weddings"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-4 sm:py-8 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                Weddings
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Your wedding day should be nothing short of extraordinary. At
                Monarcho Events, we specialize in creating luxury weddings in
                Sri Lanka and beyond, designed to be elegant, personalized, and
                completely stress-free. Whether you dream of a grand destination
                wedding, a traditional cultural ceremony, or a whimsical
                boho-style celebration, we tailor every detail to reflect your
                unique love story.
              </p>
              <p className="text-sm sm:text-base font-extralight mt-4 sm:mt-6">
                Wedding Themes We Offer:
              </p>
            </div>
          </div>
        </div>
        {/* Sub cards */}
        <div className="flex flex-col">
          {/* Grid for the first 6 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Luxury */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-[#926B48] border-[1px]">
              <h1 className="font-[Playfair] font-light italic text-xl sm:text-2xl text-[#926B48]">
                Luxury (Banquet Style)
              </h1>
              <p className="mt-2 sm:mt-5 text-[#926B48] font-medium text-xs sm:text-sm">
                Indulge in ultimate sophistication with grand banquet-style
                weddings, featuring crystal chandeliers, lavish décor, and
                five-star service. Perfect for couples dreaming of a high-end,
                glamorous wedding experience in Sri Lanka or at an exclusive
                destination.
              </p>
            </div>

            {/* Traditional */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-[#926B48] border-[1px]">
              <h1 className="font-[Playfair] font-light italic text-xl sm:text-2xl text-[#926B48]">
                Traditional Weddings
              </h1>
              <p className="mt-2 sm:mt-5 text-[#926B48] font-medium text-xs sm:text-sm">
                Celebrate heritage with beautifully curated traditional Sri
                Lankan wedding rituals, attire, and décor. We blend cultural
                authenticity with modern wedding planning expertise to create
                timeless, unforgettable ceremonies.
              </p>
            </div>

            {/* Boho */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-[#926B48] border-[1px]">
              <h1 className="font-[Playfair] font-light italic text-xl sm:text-2xl text-[#926B48]">
                Boho Weddings
              </h1>
              <p className="mt-2 sm:mt-5 text-[#926B48] font-medium text-xs sm:text-sm">
                Designed for free-spirited couples, our boho-style weddings
                incorporate earthy tones, natural textures, floral crowns, and
                dreamy outdoor settings. Ideal for couples seeking relaxed,
                romantic, and Instagram-worthy celebrations.
              </p>
            </div>

            {/* Exotic */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-[#926B48] border-[1px]">
              <h1 className="font-[Playfair] font-light italic text-xl sm:text-2xl text-[#926B48]">
                Exotic Weddings
              </h1>
              <p className="mt-2 sm:mt-5 text-[#926B48] font-medium text-xs sm:text-sm">
                Immerse yourself in a wedding inspired by tropical escapes,
                vibrant colors, and culturally diverse elements. Perfect for
                couples who want a one-of-a-kind, destination-style celebration
                filled with unique experiences.
              </p>
            </div>

            {/* Indian */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-[#926B48] border-[1px]">
              <h1 className="font-[Playfair] font-light italic text-xl sm:text-2xl text-[#926B48]">
                Indian Weddings
              </h1>
              <p className="mt-2 sm:mt-5 text-[#926B48] font-medium text-xs sm:text-sm">
                From lively Mehendi ceremonies to grand décor, we specialize in
                authentic Indian weddings that honor rich traditions while
                offering modern, stress-free planning and luxurious details.
              </p>
            </div>

            {/* Custom */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-[#926B48] border-[1px]">
              <h1 className="font-[Playfair] font-light italic text-xl sm:text-2xl text-[#926B48]">
                Custom Wedding Themes (Upon Request)
              </h1>
              <p className="mt-2 sm:mt-5 text-[#926B48] font-medium text-xs sm:text-sm">
                Have a unique vision? We welcome custom wedding themes. Share
                your ideas, and our expert team will craft a personalized
                celebration that perfectly reflects your love story.
              </p>
            </div>
          </div>

          {/* Full-width card for services list */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-[#926B48] border-[1px] sm:flex sm:flex-col sm:items-center">
            <h1 className="font-[Playfair] font-light italic text-xl sm:text-2xl text-[#926B48]">
              Comprehensive Wedding Services Include:
            </h1>
            <ul className="marker:text-[#926B48] pl-4 sm:mt-5 mt-2 font-medium list-disc text-[#926B48] text-xs sm:text-sm">
              <li>Venue Selection & Sourcing</li>
              <li>Bespoke Event Design & Décor Styling</li>
              <li>Full Wedding Planning & Coordination</li>
              <li>Local Cultural Touches (as per package)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Proposals */}
      <div className="mt-5 sm:mx-6">
        {/* Main proposals details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/proposal-banner-mobile.png"
              alt="Proposals"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/proposal-banner.png"
              alt="Proposals"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-8 sm:py-12 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                Proposals
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Pop the question in style with a romantic proposal designed to
                be as unforgettable as your love story. Whether you dream of an
                intimate beachfront proposal, a surprise engagement surrounded
                by family and friends, or a luxurious private setting, our team
                specializes in creating flawless, personalized proposal
                experiences. From creative planning to seamless execution, we
                ensure every detail makes your engagement moment truly magical.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Engagements */}
      <div className="mt-5 sm:mx-6">
        {/* Main Engagements details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/engagement-banner-mobile.png"
              alt="Engagements"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/engagement-banner.png"
              alt="Engagements"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-8 sm:py-12 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                Engagements
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Celebrate the beginning of forever with a personalized
                engagement party crafted to your style. From elegant cocktail
                evenings to traditional family gatherings, our engagement event
                planning in Sri Lanka ensures every detail reflects your love
                story. We create memorable celebrations that set the perfect
                tone for your upcoming wedding, blending sophistication,
                culture, and joy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Anniversaries */}
      <div className="mt-5 sm:mx-6">
        {/* Main Anniversaries details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/anniversary-banner-mobile.png"
              alt="Anniversaries"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/anniversary-banner.png"
              alt="Anniversaries"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-8 sm:py-12 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                Anniversaries
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Celebrate your love story with a personalized anniversary party
                in Sri Lanka. From intimate 1st-anniversary gatherings to grand
                50th celebrations, Monarcho Events crafts memorable events
                filled with love, joy, and meaningful moments. Our anniversary
                event planning ensures every detail reflects your shared journey
                and future dreams.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Birthday Parties */}
      <div className="mt-5 sm:mx-6">
        {/* Main Birthday Parties details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/birthday-banner-mobile.png"
              alt="Birthday Parties"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/birthday-banner.png"
              alt="Birthday Parties"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-8 sm:py-12 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                Birthday Parties
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Celebrate birthdays in style with personalized birthday party
                planning in Sri Lanka. From fun and colorful kids’ themed
                parties to milestone birthday bashes for adults, Monarcho Events
                handles every detail, from decor to entertainment, so you can
                enjoy the celebration stress free. Choose your vibe: elegant,
                funky, retro, or classic, and we’ll bring your birthday vision
                to life.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Baby Showers */}
      <div className="mt-5 sm:mx-6">
        {/* Main Baby Showers details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/baby-banner-mobile.png"
              alt="Baby Showers"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/baby-banner.png"
              alt="Baby Showers"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-8 sm:py-12 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                Baby Showers
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Celebrate new beginnings with expertly planned baby showers in
                Sri Lanka. Monarcho Events creates beautifully styled baby
                shower events with heartwarming details, soft aesthetics, and
                fun activities, ensuring a memorable and joyful welcome for your
                little one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gender Reveal Parties */}
      <div className="mt-5 sm:mx-6">
        {/* Main Gender Reveal Parties details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/gender-banner-mobile.png"
              alt="Gender Reveal Parties"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/gender-banner.png"
              alt="Gender Reveal Parties"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-8 sm:py-12 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                Gender Reveal Parties
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Make your baby’s gender reveal an unforgettable celebration with
                Monarcho Events. From balloon pops and smoke bombs to cake
                reveals and fully customized concepts, we design creative,
                exciting, and seamless gender reveal parties in Sri Lanka that
                keep the surprise magical for you and your loved ones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bride to Be Celebrations */}
      <div className="mt-5 sm:mx-6">
        {/* Main Bride to Be Celebrations details banner */}
        <div>
          {/* Background Image */}
          <div className="relative w-full h-[300px] sm:h-[230px]">
            <Image
              src="/assets/b2b-banner-mobile.png"
              alt="Bride to Be Celebrations"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="sm:hidden"
            />
            <Image
              src="/assets/b2b-banner.png"
              alt="Bride to Be Celebrations"
              fill
              style={{ objectFit: "cover" }}
              quality={100}
              className="hidden sm:flex"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col z-20 py-8 sm:py-12 px-4 sm:px-8 text-white">
              <h1 className="font-[Playfair] font-bold italic text-2xl sm:text-3xl">
                Bride to Be Celebrations
              </h1>
              <p className="text-sm sm:text-base mt-4 font-light">
                Celebrate the bride’s special journey with unforgettable
                pre-wedding events designed to pamper and delight. From chic
                bridal brunches and elegant high teas to luxury spa retreats and
                fun-filled gatherings with friends, Monarcho Events curates
                stylish and love-filled bride-to-be celebrations in Sri Lanka.
                We ensure every detail reflects her personality, making it the
                perfect prelude to the big day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

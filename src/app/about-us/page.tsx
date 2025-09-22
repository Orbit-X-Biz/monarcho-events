//http://localhost:3000/about-us
export default function AboutUs() {
  return (
    <>
      {/* Blank div for navbar */}
      <div className="h-20 sm:h-24"></div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#926B48] text-center my-4">
          Our Story
        </h1>
      </div>

      {/* Paragraph */}
      <div className="mx-4 text-justify font-normal text-sm">
        <p>
          Our journey began in 1993 with Professor Travel, founded by Dolitha
          Ranchagoda, whose deep love for Sri Lanka and passion for authentic
          cultural and nature experiences inspired travelers from around the
          world. Through carefully curated journeys such as “Land & People” and
          “Nature & Safari”, he revealed the island’s true beauty, its vibrant
          culture, breathtaking landscapes, and warm hospitality.
        </p>
        <br />
        <p>
          As this vision grew, Ceylon’s Best Guide was launched in 2007 to
          expand the mission, positioning Sri Lanka as a rare gem in the world
          of travel. With a personal, family-oriented approach, it offered
          meaningful travel experiences, cultural encounters, and nature-based
          adventures that allowed guests to celebrate life in unforgettable
          ways.
        </p>
        <p>
          Today, that legacy continues under a new brand, Monarcho Events. While
          the name has evolved, our values remain the same: creating genuine
          experiences, thoughtful event planning, and luxury celebrations rooted
          in the enchanting settings of Sri Lanka.
        </p>
        <br />
        <p>
          We are proud to carry forward a story built on trust, creativity, and
          excellence, bringing people together through bespoke destination
          weddings, cultural events, and once in a lifetime experiences, all
          with a fresh identity and renewed energy.
        </p>
      </div>

      {/* People */}
      <div className="my-5 mx-4">
        <h2 className="text-xl underline font-semibold text-[#926B48] text-center">
          Our Team
        </h2>

        <div className="my-2 flex flex-col space-y-8 py-2">
          {/* Each name card */}
          <div className="text-xs text-center">
            <p className="font-semibold">Dolitha Ranchagoda</p>
            <p className="font-light">Founder | Event Planner</p>
          </div>

          <div className="text-xs text-center">
            <p className="font-semibold">Thajana Ranchagoda</p>
            <p className="font-light">Event Planner & Social Media Manager</p>
          </div>

          <div className="text-xs text-center">
            <p className="font-semibold">Kavinda Gamagedara</p>
            <p className="font-light">Co-Founder & Event Coordinator</p>
          </div>

          <div className="text-xs text-center">
            <p className="font-semibold">Buddhika Athauda</p>
            <p className="font-light">International Events Manager</p>
          </div>

          <div className="text-xs text-center">
            <p className="font-semibold">Sanka Fernando</p>
            <p className="font-light">
              Reservations Manager – Destinations & Hospitality
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

import Image from "next/image";
import projectsDataRaw from "@/app/data/Projects.json";

type Project = {
  identifier: string;
  images: string[];
};

const projectsData: Project[] = Array.isArray(projectsDataRaw)
  ? projectsDataRaw
  : [projectsDataRaw];

//http://localhost:3000/gallery
export default function Gallery() {
  // Flatten all images from all projects into a single array
  const allImages = projectsData.flatMap((project: Project) => project.images);

  return (
    <>
      {/* Blank div for navbar */}
      <div className="h-20 sm:h-24"></div>

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#926B48] text-center mt-4 sm:mt-8">
          Our Gallery
        </h1>
        <p className="font-[Playfair] font-light italic px-4 text-lg text-center">
          Discover weddings, corporate events, and cultural celebrations we’ve
          transformed into unforgettable memories.
        </p>
      </div>

      {/* Gallery */}
      <div className="px-4 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allImages.map((img, index) => (
          <div key={index} className="w-full">
            <Image
              src={img}
              alt={`Gallery image ${index + 1}`}
              width={600}
              height={400}
              className="object-contain w-full h-auto max-h-80 border hover:shadow-lg transition-shadow duration-300"
            />
          </div>
        ))}
      </div>
    </>
  );
}

"use client";
import Image from "next/image";
import projectsDataRaw from "@/app/data/Projects.json";
import { useState } from "react";

type Project = {
  identifier: string;
  images: string[];
};

const projectsData: Project[] = Array.isArray(projectsDataRaw)
  ? projectsDataRaw
  : [projectsDataRaw];

const allImages = projectsData.flatMap((project: Project) => project.images);

const IMAGES_PER_PAGE = 12; // adjust as you like

export default function Gallery() {
  const [page, setPage] = useState(1);

  // calculate which images to show
  const displayedImages = allImages.slice(0, page * IMAGES_PER_PAGE);

  return (
    <>
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
        {displayedImages.map((img, index) => (
          <div key={index} className="w-full">
            <Image
              src={img}
              alt={`Gallery image ${index + 1}`}
              width={600}
              height={400}
              loading="lazy"
              className="object-contain w-full h-auto max-h-80 border hover:shadow-lg transition-shadow duration-300"
            />
          </div>
        ))}
      </div>

      {/* Load More button */}
      {displayedImages.length < allImages.length && (
        <div className="flex justify-center my-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-[#926B48] text-white px-6 py-2 rounded-md hover:scale-105 transition-transform"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

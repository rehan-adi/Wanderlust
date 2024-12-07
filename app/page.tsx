import Image from "next/image";
import { Search } from "lucide-react";

interface ImagesData {
  imageUrl: string;
  prompt: string;
  user: [];
  createdAt: Date;
}

async function getImages() {
  try {
    const response = await fetch("http://localhost:3000/api/explore");
    const data = await response.json();
    return data.images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export default async function Explore() {
  const images = await getImages();

  return (
    <div className="bg-white text-black min-h-screen pt-24 pb-10 flex flex-col items-center justify-start px-4">
      {/* Search bar */}

      <div className="w-full max-w-2xl mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for images..."
            className="w-full px-4 py-3 pl-12 bg-white rounded-full text-gray-800 placeholder-gray-400 focus:outline-none border shadow-lg"
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {images.length > 0 ? (
          images.map((img: ImagesData, Index: number) => (
            <div
              key={Index}
              className="relative group rounded-xl overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <Image
                src={img.imageUrl}
                alt={img.prompt || "Generated Image"}
                width={500}
                height={500}
                blurDataURL="data:..."
                placeholder="blur"
                className="object-cover w-full h-64 md:h-80 rounded-xl group-hover:opacity-80 transition-opacity duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-80 text-white">
                <p className="font-semibold truncate">{img.prompt}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-400">No images found.</p>
        )}
      </div>
    </div>
  );
}

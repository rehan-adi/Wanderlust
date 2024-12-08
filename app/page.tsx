import { Images } from "@/components/Image";

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

export default async function ExplorePage() {
  const images = await getImages();

  return (
    <div className="bg-white text-black min-h-screen pt-24 pb-10 flex flex-col items-center justify-start px-4">
      <Images images={images} />
    </div>
  );
}

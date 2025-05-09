import { Images } from "@/components/Image";
import  {getImages}  from "@/lib/getImages"

export default async function Gallery() {
  const images = await getImages();

  return (
    <div className="bg-white text-black min-h-screen pt-24 pb-10 flex flex-col items-center justify-start px-4">
      <Images images={images} />
    </div>
  );
}

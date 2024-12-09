"use client";

import Image from "next/image";
import { useState } from "react";
import { Download } from "lucide-react";

interface ImagesData {
  imageUrl: string;
  prompt: string;
  user: [];
  createdAt: Date;
}

interface ImageGridProps {
  images: ImagesData[];
}

export function Images({ images }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<ImagesData | null>(null);

  const openModal = (img: ImagesData) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const downloadImage = (url: string, name: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name;
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  return (
    <div className="w-full max-w-6xl flex justify-center items-center">
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-1.5">
        {images.length > 0 ? (
          images.map((img, index) => (
            <div
              key={index}
              className="relative group rounded-xl bg-white overflow-hidden shadow-lg cursor-pointer"
              onClick={() => openModal(img)}
            >
              <Image
                src={img.imageUrl}
                alt={img.prompt || "Generated Image"}
                width={444}
                height={444}
                blurDataURL="data:..."
                placeholder="blur"
                className="object-cover w-full h-56 md:h-72 rounded-xl group-hover:opacity-50 transition-opacity duration-300"
              />
              {/* Hover prompt */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold truncate text-white">
                  {img.prompt}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-700">No images found.</p>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 px-2 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.prompt || "Generated Image"}
                width={600}
                height={600}
                className="object-cover w-full h-96"
              />
            </div>
            <div className="px-4 text-center py-7">
              <p className="text-base text-center font-medium">
                {selectedImage.prompt}
              </p>
              <button
                onClick={() =>
                  downloadImage(selectedImage.imageUrl, "image.jpg")
                }
                className="mt-10 mb-4 md:px-20 px-14 py-2 bg-[#ECECF1] text-black font-semibold rounded-md"
              >
                <Download size={18} className="inline-block mr-3" />
                Downloade this Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

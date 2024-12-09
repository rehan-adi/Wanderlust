"use client";

import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Download, Loader2, Trash2 } from "lucide-react";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  image: string;
  images: { id: string; imageUrl: string; prompt: string; createdAt: string }[];
}

interface ImagesData {
  id: string;
  imageUrl: string;
  prompt: string;
  user: [];
  createdAt: Date;
}

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImagesData | null>(null);

  const getProfileData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/profile");
      if (response.status === 200) {
        setProfileData(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id: string) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`/api/delete-image/${id}`);
      if (response.status === 200) {
        if (profileData?.images) {
          const updatedImages = profileData.images.filter(
            (image) => image.id !== id
          );
          setProfileData((prev) =>
            prev ? { ...prev, images: updatedImages } : null
          );
          setSelectedImage(null);
          toast.success("Image deleted successfully");
        } else {
          console.error("Profile data or images array is missing");
        }
      } else {
        toast.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setDeleteLoading(false);
    }
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

  const openModal = (img: any) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto py-10 px-6">
          {/* Page Header Skeleton */}
          <div className="pt-16 pb-14 text-center">
            <h1 className="text-black font-semibold text-3xl">
              Manage Profile
            </h1>
            <p className="text-base font-medium mt-3 text-gray-700">
              Check your profile details and other things
            </p>
          </div>

          {/* Account Details Section Skeleton */}
          <h2 className="text-xl font-bold mb-7 text-black">Account Details</h2>

          <div className="space-y-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-t border-black border-opacity-15 py-3 md:flex-row gap-3 text-gray-300"
              >
                <div className="h-4 w-20 bg-gray-700 bg-opacity-50 rounded animate-pulse"></div>
                {idx < 2 ? (
                  <div className="h-4 w-48 bg-gray-700 bg-opacity-50 rounded animate-pulse"></div>
                ) : (
                  <div className="h-10 w-10 bg-gray-700 bg-opacity-50 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>

          {/* Images Section Skeleton */}
          <h2 className="text-xl font-bold mt-10 mb-7 text-black">
            Generated Images
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="">
                <div className="w-full h-52 bg-gray-700 bg-opacity-50 rounded-xl animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white transition-all duration-300">
      <div className="max-w-3xl mx-auto py-10 px-6">
        <div className="pt-16 pb-14 text-center">
          <h1 className="text-black font-semibold text-3xl">Manage Profile</h1>
          <p className="text-base font-medium mt-3 text-gray-700">
            Check your profile details and other things
          </p>
        </div>

        {/* Account Details Section */}
        <h2 className="text-xl font-bold mb-7 text-black">Account Details</h2>

        <div className="space-y-1">
          <div className="flex justify-between items-center border-t border-black border-opacity-15 py-3 md:flex-row gap-3 text-gray-700">
            <span>Email</span>
            <span>{profileData?.email}</span>
          </div>
          <div className="flex justify-between items-center border-t border-black border-opacity-15 py-3 md:flex-row gap-3 text-gray-700">
            <span>Name</span>
            <span>{profileData?.name}</span>
          </div>
          <div className="flex justify-between items-center border-t border-black border-opacity-15 py-3 md:flex-row gap-3 text-gray-700">
            <span>Profile Image</span>
            <div className="flex items-center gap-3">
              {profileData?.image ? (
                <img
                  src={profileData?.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-700">No image available</span>
              )}
            </div>
          </div>
        </div>

        {/* Images Section */}
        <h2 className="text-xl font-bold mt-10 mb-7 text-black">
          Generated Images
        </h2>

        <div className="w-full max-w-6xl flex justify-center items-center">
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-1.5">
            {profileData?.images && profileData.images.length > 0 ? (
              profileData.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => openModal(img)}
                  className="relative group rounded-xl bg-white overflow-hidden shadow-lg cursor-pointer"
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
              <p className="text-start text-lg text-gray-700">
                No images available.
              </p>
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
                  <p className="text-base text-black text-center font-medium">
                    {selectedImage.prompt}
                  </p>
                  <button
                    onClick={() =>
                      downloadImage(selectedImage.imageUrl, "image.jpg")
                    }
                    className="mt-7 mb-2 md:w-[90%] w-[97%] md:px-20 px-14 py-2 bg-[#ECECF1] text-black font-semibold rounded-md"
                  >
                    <Download size={18} className="inline-block mr-3" />
                    Downloade this Image
                  </button>
                  <button
                    onClick={() => deleteImage(selectedImage.id)}
                    className="mt-2 mb-4 md:w-[90%] w-[97%] md:px-20 px-14 py-2 bg-[#edddd9] text-black font-semibold rounded-md"
                  >
                    {deleteLoading ? (
                      <>
                        <Loader2
                          size={18}
                          className="inline-block mr-4 animate-spin"
                        />
                        <Trash2 size={18} className="inline-block mr-3" />
                        Delete this Image
                      </>
                    ) : (
                      <>
                        <Trash2 size={18} className="inline-block mr-3" />
                        Delete this Image
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

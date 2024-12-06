"use client";

import axios from "axios";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  image: string;
  images: { id: string; imageUrl: string; prompt: string; createdAt: string }[];
}

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="border-b border-black py-2 border-opacity-15"
              >
                {/* Image Skeleton */}
                <div className="w-full h-52 bg-gray-700 bg-opacity-50 rounded-xl animate-pulse"></div>

                {/* Content Below the Image */}
                <div className="py-4">
                  <div className="h-4 w-48 bg-gray-700 bg-opacity-50 rounded animate-pulse mb-3"></div>
                  <div className="h-8 w-8 mt-6 bg-gray-700 bg-opacity-50 rounded-full animate-pulse"></div>
                </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {profileData?.images && profileData.images.length > 0 ? (
            profileData.images.map((img, index) => (
              <div
                key={index}
                className="border-b border-black py-2 border-opacity-15"
              >
                {/* Image */}
                <img
                  src={img.imageUrl}
                  alt={`Generated Image ${index + 1}`}
                  className="w-full h-52 object-cover rounded-xl"
                />

                {/* Content Below the Image */}
                <div className="py-4">
                  <p className="text-black font-semibold mb-3 line-clamp-1">
                    {img.prompt}
                  </p>

                  {/* Download Icon */}
                  <a
                    href={img.imageUrl}
                    download
                    className="text-black mt-6 block text-center"
                  >
                    <Download size={18} />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

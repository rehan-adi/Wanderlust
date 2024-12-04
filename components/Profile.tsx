"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSidebarState } from "@/hooks/use-sidebar";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  image: string;
  images: string[];
}

const Profile = () => {
  const { isOpen } = useSidebarState();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const getProfileData = async () => {
    try {
      const response = await axios.get("/api/profile");
      if (response.status === 200) {
        setProfileData(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#060423] transition-all duration-300 ${
        isOpen ? "md:ml-[13vw]" : "ml-0"
      } right-0`}
    >
      <div className="max-w-3xl mx-auto py-10 px-6">
        <div className="pt-16 pb-10 text-center">
          <h1 className="text-white font-semibold text-3xl">Manage Profile</h1>
          <p className="text-base font-medium mt-3 text-gray-400">
            Check your profile details and other things
          </p>
        </div>

        {/* Account Details Section */}
        <h2 className="text-2xl font-bold mb-5 text-white">Account Details</h2>

        <div className="space-y-1">
          <div className="flex justify-between items-center border-t border-white border-opacity-15 py-3 md:flex-row gap-3 text-gray-300">
            <span>Email</span>
            <span>{profileData?.email || "Please Sign In"}</span>
          </div>
          <div className="flex justify-between items-center border-t border-white border-opacity-15 py-3 md:flex-row gap-3 text-gray-300">
            <span>Name</span>
            <span>{profileData?.name || "Please Sign In"}</span>
          </div>
          <div className="flex justify-between items-center border-t border-white border-opacity-15 py-3 md:flex-row gap-3 text-gray-300">
            <span>Profile Image</span>
            <div className="flex items-center gap-3">
              {profileData?.image ? (
                <img
                  src={profileData?.image || ""}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No image available</span>
              )}
            </div>
          </div>
        </div>

        {/* Images Section */}
        <h2 className="text-2xl font-bold mt-10 mb-5 text-white">
          Generated Images
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {profileData?.images && profileData.images.length > 0 ? (
            profileData.images.map((img, index) => (
              <div
                key={index}
                className="border border-white border-opacity-15 p-3 rounded-md"
              >
                <img
                  src={img}
                  alt={`Generated Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

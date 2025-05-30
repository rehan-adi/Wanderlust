"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
  ChevronUp,
  ChevronDown,
  HardDriveDownload,
  Settings,
  History,
  Fullscreen,
  Download,
  Trash2,
  EllipsisVertical,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type ImagePromptHistory = {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
};

const SettingsPage = () => {
  const [imageLen, setImageLen] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  const [imageHistory, setImageHistory] = useState<
    ImagePromptHistory[] | undefined
  >(undefined);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImagePromptHistory | null>(
    null
  );
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const getImageHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/image-history");
      if (response.data.success) {
        setImageHistory(response.data.imageHistory);
        setImageLen(response.data.imageCount);
      } else {
        setError("Failed to fetch chat history.");
      }
    } catch (error) {
      setError("Failed to fetch chat history.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteChatHistory = async (id: string) => {
    try {
      setDeleteLoading(true);
      const response = await axios.delete(`/api/image-history/${id}`);
      if (response.data.success) {
        toast.success("Deleted image history");
        setImageHistory((prev) => prev?.filter((item) => item.id !== id));
        setDeleteLoading(false);
      } else {
        toast.error("Failed to delete image history");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewClick = (image: ImagePromptHistory) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getImageHistory();
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Modal component
  const Modal = ({ image }: { image: ImagePromptHistory }) => (
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
            src={image.imageUrl}
            alt={image.prompt || "Generated Image"}
            width={600}
            height={600}
            className="object-cover w-full h-[365px]"
          />
        </div>
        <div className="px-4 text-center py-7">
          <p className="text-base text-center font-medium">{image.prompt}</p>
          <button
            onClick={() => downloadImage(image.imageUrl, "image.jpg")}
            className="mt-8 mb-2 md:px-20 px-14 py-2 bg-[#ECECF1] text-black font-semibold rounded-md"
          >
            <Download size={18} className="inline-block mr-3" />
            Download this Image
          </button>
        </div>
      </div>
    </div>
  );

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 bg-opacity-50 rounded w-1/2"></div>
      <div className="h-6 bg-gray-300 bg-opacity-50 rounded w-2/3"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-24 py-8">
      <h1 className="text-2xl font-semibold text-black">
        <Settings className="inline-block mr-1 mb-1" /> Setting
      </h1>
      {/* Data Usage Section */}
      <section className="mt-8 bg-white shadow-md border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-black">
          <HardDriveDownload size={22} className="inline-block mb-2 mr-2" />{" "}
          Data Usage
        </h2>
        <div className="mt-5 space-y-2">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              <p className="text-gray-700 font-medium">
                Total images generated: <strong>{imageLen}</strong>
              </p>
              <p className="text-gray-700 font-medium">
                Remaining credits: <strong>Unlimited</strong>
              </p>
            </>
          )}
        </div>
      </section>

      {/* Image History Section */}
      <section className="mt-8 bg-white shadow-md border rounded-xl px-6 pt-4 pb-2">
        <h2 className="text-xl font-semibold text-black">
          <History size={20} className="inline-block mr-1 mb-1" /> Image History
        </h2>
        <div className="mt-4 flex items-center space-x-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
          >
            {showHistory ? (
              <>
                <ChevronUp size={20} />
                <span className="text-gray-600">Hide image history</span>
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                <span className="text-gray-600">Show image history</span>
              </>
            )}
          </button>
        </div>
        <div
          className={`mt-4 transition-all duration-500 ease-in-out ${
            showHistory ? "min-h-24 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          {loading ? (
            <SkeletonLoader />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            showHistory && (
              <div className="mt-3 border-t border-gray-300 pt-4 pb-10">
                {imageHistory && imageHistory.length > 0 ? (
                  <div className="space-y-5">
                    {imageHistory.map((image) => (
                      <div
                        key={image.id}
                        className="flex justify-between items-start"
                      >
                        <span className="text-black font-medium md:w-[80%] w-[88%]">
                          {image.prompt}
                        </span>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenDropdownId((prev) =>
                                prev === image.id ? null : image.id
                              )
                            }
                          >
                            <EllipsisVertical
                              className="text-black"
                              size={20}
                            />
                          </button>

                          {openDropdownId === image.id && (
                            <div
                              ref={dropdownRef}
                              className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded-md shadow-md z-50"
                            >
                              <button
                                onClick={() => {
                                  handleViewClick(image);
                                  setOpenDropdownId(null);
                                }}
                                className="block w-full text-left px-4 py-2 font-semibold hover:bg-gray-100 text-sm"
                              >
                                <Fullscreen size={18} className="inline mr-2" />
                                View
                              </button>
                              <button
                                onClick={() => {
                                  deleteChatHistory(image.id);
                                  setSelectedImage(null);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600 z-50 font-semibold"
                              >
                                {deleteLoading ? (
                                  <>
                                    <Loader2
                                      className="animate-spin inline mr-2"
                                      size={16}
                                    />
                                    Deleting...
                                  </>
                                ) : (
                                  <>
                                    <Trash2 size={18} className="inline mr-2" />
                                    Delete
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    You haven’t generated any images yet.
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </section>

      {isModalOpen && selectedImage && <Modal image={selectedImage} />}
    </div>
  );
};

export default SettingsPage;

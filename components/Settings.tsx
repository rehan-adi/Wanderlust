"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type ChatHistory = {
  prompt: string;
  imageUrl: string;
  createdAt: string;
};

type ChatSession = {
  id: string;
  chatHistory: ChatHistory[];
};

const Settings = () => {
  const router = useRouter();

  const [imageLen, setImageLen] = useState<number>();
  const [showHistory, setShowHistory] = useState<boolean>(true);
  const [chatSessions, setChatSessions] = useState<ChatSession[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getChatHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/chat-history");
      console.log(response.data);
      if (response.data.success) {
        setChatSessions(response.data.sessions);
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

  const handleViewClick = (id: string) => {
    router.push(`/chat-history/${id}`);
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-600 bg-opacity-50 rounded w-1/2"></div>
      <div className="h-6 bg-gray-600 bg-opacity-50 rounded w-2/3"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 py-8">
      <h1 className="text-3xl font-semibold text-black">Settings</h1>

      {/* Data Usage Section */}
      <section className="mt-8 bg-white shadow-lg border rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-black">Data Usage</h2>
        <div className="mt-4 space-y-2">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              <p className="text-gray-700">
                Total images generated: <strong>{imageLen}</strong>
              </p>
              <p className="text-gray-700">
                Remaining credits: <strong>Unlimited</strong>
              </p>
            </>
          )}
        </div>
      </section>

      {/* Chat History Section */}
      <section className="mt-8 bg-white shadow-lg border rounded-xl px-6 py-4">
        <h2 className="text-2xl font-semibold text-black">Chat History</h2>
        <div className="mt-4 flex items-center space-x-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
          >
            {showHistory ? (
              <>
                <ChevronUp size={20} />
                <span className="text-gray-600">Hide chat history</span>
              </>
            ) : (
              <>
                <ChevronDown size={20} />
                <span className="text-gray-600">Show chat history</span>
              </>
            )}
          </button>
        </div>
        <div
          className={`mt-4 transition-all duration-500 ease-in-out ${
            showHistory ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          {loading ? (
            <SkeletonLoader />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            showHistory && (
              <div className="mt-6 border-t border-gray-300 pt-4">
                {chatSessions && chatSessions.length > 0 ? (
                  chatSessions.map((session) => (
                    <div key={session.id} className="mt-4">
                      {session.chatHistory.length > 0 ? (
                        <ul className="space-y-3">
                          <li className="flex justify-between items-start">
                            <span className="text-gray-800 w-[80%]">
                              {session.chatHistory[0].prompt}
                            </span>
                            <button
                              onClick={() => handleViewClick(session.id)}
                              className="text-sm font-semibold underline text-blue-500"
                            >
                              View
                            </button>
                          </li>
                        </ul>
                      ) : (
                        <p>No chat history available</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No chat sessions found.</p>
                )}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Settings;

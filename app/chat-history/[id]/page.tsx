"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2, Clock } from "lucide-react";

type ChatHistory = {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: string;
};

const ChatHistoryPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchChatHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/chat-history/${id}`);
        if (response.data.success) {
          setChatHistory(response.data.chatHistory);
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

    fetchChatHistory();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const deleteAllChats = async () => {
    try {
      const response = await axios.delete(`/api/chat-history/${id}`);
      if (response.data.success) {
        setChatHistory([]);
      } else {
        setError("Failed to delete chat history.");
      }
    } catch (error) {
      setError("Failed to delete chat history.");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-black">Chat History</h1>
        <button
          onClick={deleteAllChats}
          className="text-red-500 hover:text-red-700 flex items-center"
        >
          <Trash2 size={20} className="mr-2" />
          Delete
        </button>
      </div>

      {chatHistory.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No chat history available
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-8">
          {chatHistory.map((chat, index) => (
            <li
              key={index}
              className="flex flex-col space-y-4 pb-5 bg-white rounded-lg shadow-lg"
            >
              {/* Image on the top */}
              <div className="flex justify-center">
                <img
                  src={chat.imageUrl}
                  alt="Generated image"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>

              {/* User prompt below image */}
              <div className="px-4 py-2">
                <p className="text-gray-800">{chat.prompt}</p>
              </div>

              {/* Date below the prompt */}
              <p className="text-sm px-4">
                <Clock size={16} className="inline-block mr-2"/>
                {formatDate(chat.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistoryPage;

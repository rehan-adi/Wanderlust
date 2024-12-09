"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Send, Loader2, Download } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { text: string; isUser: Boolean; loading?: boolean }[]
  >([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    setMessages((prev) => [...prev, { text: inputText, isUser: true }]);
    setInputText("");

    setMessages((prev) => [
      ...prev,
      { text: "Generating image...", isUser: false, loading: true },
    ]);

    try {
      setLoading(true);
      const response = await axios.post("/api/generate", { prompt: inputText });

      const imageUrl = response.data.imageUrl;

      setMessages((prev) =>
        prev.map((message, index) =>
          index === prev.length - 1
            ? { text: imageUrl, isUser: false }
            : message
        )
      );

      setGeneratedImage(imageUrl);
    } catch (error: any) {
      console.error("Error generating image:", error);
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error("Error generating image", {
        description: message,
      });

      setMessages((prev) =>
        prev.map((message, index) =>
          index === prev.length - 1
            ? {
                text: "Failed to generate image. Please try again later.",
                isUser: false,
              }
            : message
        )
      );
    } finally {
      setLoading(false);
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

  return (
    <div className="bg-white text-black min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-end items-center w-full pt-3 pb-3">
        <div className="flex flex-col space-y-7 my-4 mt-14 md:max-w-2xl w-full overflow-y-auto px-4 py-5">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {message.isUser ? (
                <div className="bg-[#5865F2] text-white font-medium py-2 px-3 rounded-2xl max-w-[70%]">
                  {message.text}
                </div>
              ) : message.loading ? (
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-gray-200">
                  <Loader2 size={20} className="animate-spin text-black" />
                  <span className="font-medium">Generating image...</span>
                </div>
              ) : message.text.startsWith("http") ? (
                // Display generated image
                <div className="relative rounded-2xl group">
                  <Image
                    src={message.text}
                    alt="Generated Image"
                    width={430}
                    height={430}
                    className="max-w-full rounded-xl"
                  />
                  <button
                    onClick={() => downloadImage(message.text, "image.jpg")}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <Download size={20} />
                  </button>
                </div>
              ) : (
                <div className="bg-red-500 text-white font-medium py-2 px-4 rounded-2xl max-w-[70%]">
                  {message.text}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input and Send Button */}
        <div className="flex gap-3 bg-white z-40 fixed bottom-0 py-5 justify-center w-full">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your image"
            className="py-3 px-7 bg-white rounded-2xl border border-black border-opacity-20 md:w-[40vw] w-[75vw] text-black font-medium placeholder:text-black placeholder:font-medium focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`flex items-center gap-2 py-3 px-5 rounded-2xl ${
              loading
                ? "bg-black text-white cursor-not-allowed"
                : "bg-black text-white"
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

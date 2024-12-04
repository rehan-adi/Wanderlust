"use client";

import axios from "axios";
import { useState } from "react";
import { Send } from "lucide-react";
import { useSidebarState } from "@/hooks/use-sidebar";

export default function Home() {
  const { isOpen } = useSidebarState();
  const [inputText, setInputText] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );

  const handleSend = async () => {
    if (!inputText.trim()) return;

    setMessages((prev) => [...prev, { text: inputText, isUser: true }]);
    setInputText("");

    try {
      const response = await axios.post("/api/generate", { prompt: inputText });

      const imageUrl = response.data.imageUrl;

      setMessages((prev) => [...prev, { text: imageUrl, isUser: false }]);

      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);

      setMessages((prev) => [
        ...prev,
        {
          text: "Failed to generate image. Please try again later.",
          isUser: false,
        },
      ]);
    }
  };

  return (
    <div
      className={`bg-[#060423] text-white min-h-screen flex justify-center items-center transition-all duration-300 ${
        isOpen ? "md:ml-[13vw]" : "ml-0"
      }`}
    >
      <div className="flex flex-col justify-end items-center w-full py-8">
        <div className="flex flex-col space-y-4 mb-16 max-w-2xl w-full overflow-y-auto px-4 py-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              {message.isUser ? (
                <div className="bg-[#5865F2] text-white py-2 px-4 rounded-2xl max-w-[70%] text-right">
                  {message.text}
                </div>
              ) : message.text.startsWith("http") ? (
                // Display generated image
                <div className="bg-[#1b1b2f] p-4 rounded-2xl">
                  <img
                    src={message.text}
                    alt="Generated"
                    className="max-w-full rounded-lg"
                  />
                </div>
              ) : (
                // Display bot text response (if needed)
                <div className="bg-[#1b1b2f] text-white py-2 px-4 rounded-2xl max-w-[70%]">
                  {message.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input and Send Button */}
        <div className="flex gap-3 bg-[#060423] z-40 fixed bottom-0 py-5 justify-center w-full">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your image"
            className="py-3 px-7 bg-[#1b1b2f] rounded-2xl border border-white border-opacity-20 md:w-[40vw] w-[75vw] text-white placeholder-opacity-50 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="flex items-center gap-2 py-3 px-5 bg-white text-black rounded-2xl transition-transform border border-white border-opacity-20"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

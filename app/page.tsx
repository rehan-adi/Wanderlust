"use client";

import { Send } from "lucide-react";
import { useSidebarState } from "@/hooks/use-sidebar";

export default function Home() {
  const { isOpen } = useSidebarState();

  return (
    <div
      className={`bg-[#060423] text-white min-h-screen flex justify-center items-center transition-all duration-300 ${
        isOpen ? "md:ml-[13vw]" : "ml-0"
      }`}
    >
      <div className="flex flex-col fixed md:bottom-20 bottom-10 items-center">
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Describe your image"
            className="py-3 px-7 bg-[#1b1b2f] rounded-2xl border border-white border-opacity-20 md:w-[40vw] w-[75vw] text-white placeholder-opacity-50 focus:outline-none"
          />
          <button className="flex items-center gap-2 py-3 px-5 bg-white text-black rounded-2xl transition-transform border border-white border-opacity-20">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

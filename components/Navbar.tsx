"use client";

import { useSidebarState } from "@/hooks/use-sidebar";

export default function Navbar() {
  const { isOpen } = useSidebarState();

  return (
    <nav
      className={`fixed top-2 z-20 h-16 bg-[#0c0f12] text-white transition-all duration-300 ${
        isOpen ? "left-[13vw] md:left-[13vw]" : "left-0"
      } right-0`}
    >
      <div className="flex h-full items-center justify-between md:px-20 ml-10 md:ml-0 px-6">
        <div className=" font-semibold text-white">
          <span>Wanderlust</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}

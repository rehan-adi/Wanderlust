"use client";

import React, { useState } from "react";
import {
  Compass,
  Edit,
  PanelRightOpen,
  PanelLeftOpen,
  MessagesSquare,
} from "lucide-react";

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string }> = ({
  icon,
  label,
}) => (
  <a
    href="#"
    className="flex items-center space-x-3 px-4 py-2.5 rounded-full border border-transparent hover:border-white hover:border-opacity-15 hover:bg-[#2D2E37] transition-all duration-200"
  >
    <div className="text-white transition-colors duration-200">{icon}</div>
    <span className="text-white transition-colors duration-200 text-sm font-semibold">
      {label}
    </span>
  </a>
);

// Sidebar component
const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
    className={`flex flex-col transition-all bg-[#0c0f12] duration-300 ${
      isSidebarOpen
        ? "md:w-[13vw] border-r border-white border-opacity-10 w-[47vw]"
        : "w-0 border-none"
    }`}
    >
      <nav className="flex flex-col space-y-2 mt-24 px-3">
        <SidebarItem icon={<Compass size={21} />} label="Explore" />
        <SidebarItem icon={<MessagesSquare size={21} />} label="Chat" />
        <SidebarItem icon={<Edit size={21} />} label="Edit" />
      </nav>

      {/* Button to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className="absolute top-5 left-3 z-50 p-3 text-white rounded-md"
      >
        {isSidebarOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
      </button>
    </div>
  );
};

export default Sidebar;

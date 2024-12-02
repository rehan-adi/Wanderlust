"use client";

import React from "react";
import { useSidebarState } from "@/hooks/use-sidebar";
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

const Sidebar: React.FC = () => {
  const { isOpen, toggle } = useSidebarState();

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen z-30 flex flex-col transition-all bg-[#0c0f12] duration-300 ${
          isOpen
            ? "md:w-[13vw] border-r border-white border-opacity-10 w-[55vw]"
            : "w-0 border-none"
        } overflow-hidden`}
      >
        <nav className="flex flex-col space-y-2 mt-24 px-3">
          <SidebarItem icon={<Compass size={21} />} label="Explore" />
          <SidebarItem icon={<MessagesSquare size={21} />} label="Chat" />
          <SidebarItem icon={<Edit size={21} />} label="Edit" />
        </nav>
      </div>

      <button
        onClick={toggle}
        className="fixed top-5 left-2 z-50 p-2 text-white rounded-md bg-[#0c0f12] hover:bg-[#2D2E37] transition-colors duration-200"
      >
        {isOpen ? <PanelRightOpen size={24} /> : <PanelLeftOpen size={24} />}
      </button>
    </>
  );
};

export default Sidebar;

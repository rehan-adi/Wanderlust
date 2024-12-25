import { BrainCircuit } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full py-4 md:px-12 lg:px-40 px-4 bg-white text-black flex flex-col md:flex-row justify-between items-center">
      <Link
        href="/"
        className="flex justify-center font-secondary text-xl items-center gap-3"
      >
        <BrainCircuit size={25} />
        <span className="mt-1 mb-3 md:mb-0">Wanderlust AI</span>
      </Link>
      <p className="text-sm font-semibold">
        &copy; {new Date().getFullYear()} Wanderlust. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

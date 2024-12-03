"use client";

import Link from "next/link";
import Signin from "./Signin";
import { useState } from "react";
import { LogIn } from "lucide-react";
import { useSidebarState } from "@/hooks/use-sidebar";

export default function Navbar() {
  const { isOpen } = useSidebarState();

  const [modal, setModal] = useState(false);

  const openSignin = () => setModal(true);
  const closeSignin = () => setModal(false);

  return (
    <>
      <nav
        className={`fixed top-0 z-20 h-20 bg-[#060423] text-white transition-all duration-300 ${
          isOpen ? "left-[13vw] md:left-[13vw]" : "left-0"
        } right-0`}
      >
        <div className="flex h-full items-center justify-between md:px-20 ml-10 md:ml-0 px-6">
          <div>
            <Link href="/">
              <span className="font-semibold text-white">Wanderlust</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={openSignin}
              className="flex gap-2 items-center w-fit basis-1 justify-center p-2 px-5 min-w-max text-sm font-bold text-center rounded-full transition-all md:text-base outline-[#09073a]/50 bg-yellow-900/20 text-yellow-50 hover:bg-yellow-900"
            >
              <LogIn size={17} className="text-yellow-500" />
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {modal && <Signin onClose={closeSignin} />}
    </>
  );
}

"use client";

import Link from "next/link";
import Signin from "./Signin";
import { useState } from "react";
import { LogIn, Loader2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useSidebarState } from "@/hooks/use-sidebar";

export default function Navbar() {
  const { isOpen } = useSidebarState();
  const { data: session, status } = useSession();

  const [modal, setModal] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const openSignin = () => setModal(true);
  const closeSignin = () => setModal(false);

  const toggleProfileMenu = () => setProfileMenu(!profileMenu);
  const closeProfileMenu = () => setProfileMenu(false);

  return (
    <>
      <nav
        className={`fixed top-0 z-20 h-[60px] bg-[#060423] text-white transition-all duration-300 ${
          isOpen ? "left-[13vw] md:left-[13vw]" : "left-0"
        } right-0`}
      >
        <div className="flex h-full items-center justify-between md:px-20 ml-10 md:ml-0 px-6">
          <div>
            <Link href="/">
              <span className="font-semibold text-white">Wanderlust</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4 relative">
            {status === "loading" ? (
              <span>
                <Loader2 className="w-5 h-5 animate-spin" />
              </span>
            ) : session?.user?.id ? (
              <>
                <img
                  src={session.user.image || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={toggleProfileMenu}
                />
                {profileMenu && (
                  <div
                    className="absolute top-2 right-0 mt-12 w-48 bg-[#060423] border border-white border-opacity-10 rounded-xl shadow-lg"
                    onBlur={closeProfileMenu}
                  >
                    <ul className="p-2">
                      <li className="px-4 py-2 hover:bg-[#13132a] rounded-xl cursor-pointer">
                        <Link href="/profile">Profile</Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-[#13132a] rounded-xl cursor-pointer text-red-500"
                        onClick={() => signOut()}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={openSignin}
                className="flex gap-2 items-center w-fit basis-1 justify-center p-2 px-5 min-w-max text-sm font-bold text-center rounded-full transition-all md:text-base outline-[#09073a]/50 bg-yellow-900/20 text-yellow-50 hover:bg-yellow-900"
              >
                <LogIn size={17} className="text-yellow-500" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {modal && <Signin onClose={closeSignin} />}
    </>
  );
}

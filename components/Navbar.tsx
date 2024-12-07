"use client";

import Link from "next/link";
import Signin from "./Signin";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const [modal, setModal] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);

  const openSignin = () => setModal(true);
  const closeSignin = () => setModal(false);

  const toggleProfileMenu = () => setProfileMenu(!profileMenu);
  const closeProfileMenu = () => setProfileMenu(false);

  return (
    <>
      <nav className="fixed top-0 z-20 h-[60px] bg-white border border-black border-opacity-15 w-full text-black">
        <div className="flex h-full items-center justify-between md:px-12 px-4">
          <div>
            <Link href="/">
              <span className="font-bold md:text-xl text-base text-black">Wanderlust</span>
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
                  className="w-8 h-8 rounded-full cursor-pointer"
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
                className="bg-black text-white flex gap-3 text-sm font-semibold justify-center items-center rounded-lg py-2 px-5"
              >
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

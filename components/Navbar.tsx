"use client";

import Link from "next/link";
import Signin from "./Signin";
import { useState } from "react";
import { Loader2, User, LogIn } from "lucide-react";
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
        <div className="flex h-full items-center justify-between md:px-20 px-4">
          <div>
            <Link href="/">
              <span className="font-bold md:text-xl text-base text-black">
                <svg width="30" height="16" viewBox="0 0 30 16">
                  <path d="m18.4 0-2.803 10.855L12.951 0H9.34L6.693 10.855 3.892 0H0l5.012 15.812h3.425l2.708-10.228 2.709 10.228h3.425L22.29 0h-3.892ZM24.77 13.365c0 1.506 1.12 2.635 2.615 2.635C28.879 16 30 14.87 30 13.365c0-1.506-1.12-2.636-2.615-2.636s-2.615 1.13-2.615 2.636Z"></path>
                </svg>
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4 relative">
            {status === "loading" ? (
              <span>
                <Loader2 className="w-5 h-5 animate-spin" />
              </span>
            ) : session?.user?.id ? (
              <>
                <Link href="/generate">
                  <button className="bg-black text-white flex text-sm font-semibold justify-center items-center rounded-lg py-2 px-4">
                    Generate
                  </button>
                </Link>
                <img
                  src={session.user.image || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full cursor-pointer"
                  onClick={toggleProfileMenu}
                />
                {profileMenu && (
                  <div
                    className="absolute top-2 right-0 mt-12 w-48 bg-white border border-black border-opacity-10 rounded-xl shadow-lg"
                    onBlur={closeProfileMenu}
                  >
                    <ul className="p-2">
                      <li className="px-4 py-2 rounded-xl hover:bg-gray-100 flex cursor-pointer">
                        <Link href="/profile">
                          <User size={17} className="inline-block mr-2" />
                          Profile
                        </Link>
                      </li>
                      <li
                        className="px-4 py-2 rounded-xl hover:bg-gray-100 cursor-pointer text-red-500"
                        onClick={() => signOut()}
                      >
                        <LogIn size={17} className="inline-block mr-2" />
                        Log out
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

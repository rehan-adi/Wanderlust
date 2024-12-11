"use client";

import Link from "next/link";
import Signin from "./Signin";
import Image from "next/image";
import { User, LogIn, Settings, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const { data: session, status } = useSession();

  const [modal, setModal] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const openSignin = () => setModal(true);
  const closeSignin = () => setModal(false);

  const toggleProfileMenu = () => setProfileMenu(!profileMenu);
  const closeProfileMenu = () => setProfileMenu(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target as Node)
    ) {
      closeProfileMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-20 h-[60px] bg-white border border-black border-opacity-10 w-full text-black">
        <div className="flex h-full items-center justify-between md:px-8 lg:px-20 px-4">
          <div>
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={28}
                height={28}
                priority
                blurDataURL="data:image/svg+xml;base64,..."
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4 relative">
            {status === "loading" ? (
              <div className="flex items-center space-x-4">
                <div className="w-[85px] h-[36px] bg-gray-300 animate-pulse rounded-lg" />
                <div className="w-[36px] h-[36px] bg-gray-300 animate-pulse rounded-full" />
              </div>
            ) : session?.user?.id ? (
              <>
                <Link href="/generate">
                  <button className="bg-black text-white flex text-sm font-semibold justify-center items-center rounded-lg py-2 px-3">
                    Generate
                  </button>
                </Link>
                <Image
                  src={session.user.image || "/default.png"}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  blurDataURL="data:..."
                  placeholder="blur"
                  className="rounded-full cursor-pointer"
                  onClick={toggleProfileMenu}
                  onError={(e) => (e.currentTarget.src = "/default.png")}
                />
                {profileMenu && (
                  <AnimatePresence>
                    <motion.div
                      ref={profileMenuRef}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute top-2 right-0 mt-12 w-48 bg-white border border-black border-opacity-10 rounded-xl shadow-2xl"
                    >
                      <ul className="p-2">
                        <li className="px-4 py-2 rounded-xl hover:bg-gray-100 font-medium flex cursor-pointer">
                          <Link href="/profile">
                            <User size={17} className="inline-block mr-2" />
                            Profile
                          </Link>
                        </li>
                        <li className="px-4 py-2 rounded-xl hover:bg-gray-100 font-medium flex cursor-pointer">
                          <Link href="/settings">
                            <Settings size={17} className="inline-block mr-2" />
                            Settings
                          </Link>
                        </li>
                        <li
                          className="px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer font-medium text-red-500"
                          onClick={() => signOut()}
                        >
                          <LogIn size={17} className="inline-block mr-2" />
                          Sign out
                        </li>
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                )}
              </>
            ) : (
              <button
                onClick={openSignin}
                className="bg-black text-white flex gap-3 text-sm font-semibold justify-center items-center rounded-lg py-2 px-4"
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

"use client";

import Link from "next/link";
import Signin from "./Signin";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  User,
  LogIn,
  Settings,
  Pencil,
  BrainCircuit,
  X,
  Image as ImageIcon,
  LayoutDashboard,
  Coins,
  QrCode,
  ArrowUpRight,
} from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();

  const [modal, setModal] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <nav className="fixed top-0 z-20 h-[63px] bg-white bg-opacity-95 border border-black border-opacity-10 w-full text-black">
        <div className="flex h-full items-center justify-between md:px-12 lg:px-40 px-4">
          <div className="flex items-center justify-center h-screen">
            <Link
              href="/"
              className="flex justify-center font-secondary text-xl items-center gap-3"
            >
              <BrainCircuit size={25} />
              <span className="mt-1">Wanderlust AI</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4 relative">
            {status === "loading" ? (
              <div className="flex items-center space-x-4">
                <div className="w-[85px] h-[36px] bg-gray-300 animate-pulse rounded-lg" />
                <div className="w-[36px] h-[36px] bg-gray-300 animate-pulse rounded-full" />
              </div>
            ) : session?.user?.id ? (
              <>
                <Button className="bg-[#0f172a] text-white hover:bg-[#1e293b]">
                  <Link href="/dashboard">
                    Go to Dashboard{" "}
                    <ArrowUpRight className="inline-block ml-1" />
                  </Link>
                </Button>
                <Image
                  src={session.user.image || "/default.png"}
                  alt="User Avatar"
                  width={37}
                  height={37}
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
                          <Link href="/gallery">
                            <ImageIcon
                              size={17}
                              className="inline-block mr-2"
                            />
                            Gallery
                          </Link>
                        </li>
                        <li className="px-4 py-2 rounded-xl hover:bg-gray-100 font-medium flex cursor-pointer">
                          <Link href="/pricing">
                            <Coins size={17} className="inline-block mr-2" />
                            Pricing
                          </Link>
                        </li>
                        <li className="px-4 py-2 rounded-xl hover:bg-gray-100 font-medium flex cursor-pointer">
                          <Link href="/edit">
                            <Pencil size={16} className="inline-block mr-2" />
                            Edit Image
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
              <Button
                onClick={openSignin}
                className="bg-[#0f172a] text-white hover:bg-[#1e293b]"
              >
                Sign In
              </Button>
            )}
          </div>
          {/* Hamburger menu for small screens */}
          <div className="md:hidden flex items-center">
            <QrCode
              size={24}
              className="cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>
        </div>
      </nav>

      {/* Sidebar for small screens */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 z-30 h-full w-3/4 bg-white shadow-lg border-l border-gray-200"
          >
            <div className="flex items-center border-b justify-between px-4 py-[17px]">
              <span className="text-xl font-semibold">Menu</span>
              <X size={24} className="cursor-pointer" onClick={toggleSidebar} />
            </div>
            <div className="flex flex-col mt-4 space-y-6 px-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-medium text-lg"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 font-medium text-lg"
              >
                <User size={20} className="inline-block" />
                Profile
              </Link>
              <Link
                href="/gallery"
                className="flex items-center gap-2 font-medium text-lg"
              >
                <ImageIcon size={20} />
                Gallery
              </Link>
              <Link
                href="/pricing"
                className="flex items-center gap-2 font-medium text-lg"
              >
                <Coins size={20} />
                Pricing
              </Link>
              <Link
                href="/edit"
                className="flex items-center gap-2 font-medium text-lg"
              >
                <Pencil size={20} className="inline-block" />
                Edit Image
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 font-medium text-lg"
              >
                <Settings size={20} className="inline-block" />
                Settings
              </Link>
              {session?.user?.id ? (
                <Button
                  onClick={() => signOut()}
                  className="bg-[#0f172a] text-white hover:bg-[#1e293b] font-medium text-base py-2 px-4 rounded-lg"
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  onClick={openSignin}
                  className="bg-[#0f172a] text-white hover:bg-[#1e293b] font-medium text-base py-2 px-4 rounded-lg"
                >
                  Sign In
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {modal && <Signin onClose={closeSignin} />}
    </>
  );
}

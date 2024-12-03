"use client";

import { useSession } from "next-auth/react";
import { useSidebarState } from "@/hooks/use-sidebar";

export default function Home() {
  const { data: session, status } = useSession();
  const { isOpen } = useSidebarState();

  if (status === "loading") {
    return (
      <div className="bg-[#0c0f12] text-white flex justify-center items-center min-h-screen w-full">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-[#0c0f12] text-white flex justify-center items-center min-h-screen w-full">
        No session found
      </div>
    );
  }

  return (
    <div
      className={`bg-[#0c0f12] text-white min-h-screen flex justify-center items-center transition-all duration-300 ${
        isOpen ? "md:ml-[13vw]" : "ml-0"
      }`}
    >
      <div className="flex flex-col items-center">
        <img
          src={session.user?.image || "/default-avatar.png"}
          alt={session.user?.name || "User"}
          className="rounded-full w-32 h-32 mb-4"
        />
        <h1 className="text-2xl">{session.user?.name || "No Name"}</h1>
        <h1 className="text-2xl">{session.user?.id || "No ID"}</h1>{" "}
        {/* Display userId */}
        <p className="text-lg">{session.user?.email || "No Email"}</p>
      </div>
    </div>
  );
}

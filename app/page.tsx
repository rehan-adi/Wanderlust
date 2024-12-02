"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      const userId = session.user.id;
      getSession(userId);
    } else {
      console.error("No userId found");
    }
  }, [session]);

  const getSession = async (userId: string) => {
    try {
      const response = await axios.get("/api/session", {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      console.log("Session response:", response.data);
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="bg-black text-white flex justify-center items-center min-h-screen w-full">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-black text-white flex justify-center items-center min-h-screen w-full">
        No session found
      </div>
    );
  }

  return (
    <div className="bg-black text-white flex justify-center items-center min-h-screen w-full">
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

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChat = pathname.startsWith("/dashboard/chat");

  return (
    <>
      {!isChat && <Navbar />}
      <main className="min-h-screen transition-all duration-300">
        {children}
      </main>
      {!isChat && <Footer />}
    </>
  );
}

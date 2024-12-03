import "./globals.css";
import type { Metadata } from "next";
import Provider from "@/context/Provider";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Wanderlust - AI Generated Images",
  description:
    "Create stunning images with AI. Wanderlust offers creative and customizable image generation powered by the latest AI technology.",
  keywords: [
    "AI",
    "image generation",
    "artificial intelligence",
    "creative images",
    "AI art",
    "Wanderlust",
    "AI-powered images",
  ],

  // Open Graph metadata (for social media sharing)
  openGraph: {
    type: "website",
    url: "https://wanderlust.com",
    title: "Wanderlust - AI Generated Images",
    description: "Explore and create beautiful images with AI.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wanderlust AI-generated images",
      },
    ],
  },

  // Additional metadata for robots (SEO)
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className="bg-[#060423]">
          <Sidebar />
          <Navbar />
          <main className="min-h-screen transition-all duration-300">
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
}
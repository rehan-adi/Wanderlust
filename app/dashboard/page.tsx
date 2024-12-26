import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800 flex justify-center items-center flex-col lg:flex-row gap-8 py-8 px-4">
      <div className="w-full md:w-[27vw] bg-white border shadow-lg rounded-lg p-6">
        <div className="w-full aspect-w-16 aspect-h-9 relative mb-6 overflow-hidden rounded-md">
          <Image
            src="/images/landing.png"
            alt="Flash"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h2 className="text-3xl font-secondary font-medium text-left mb-4">
          Flash
        </h2>
        <p className="text-lg text-muted-foreground mb-6 text-start">
          Flash helps you generate simple code snippets, text content, and even
          question-answer pairs effortlessly. Designed to speed up your
          development and simplify your workflow.
        </p>
        <div className="flex justify-center w-full">
          <Button
            asChild
            className="bg-[#0f172a] text-lg font-semibold py-5 text-white w-full hover:bg-[#1e293b]"
          >
            <Link href="/dashboard/chat">
              Flash <ExternalLink size={30} className="inline-block ml-2" />{" "}
            </Link>
          </Button>
        </div>
      </div>
      <div className="w-full md:w-[27vw] mt-16 md:mt-0 bg-white border shadow-lg rounded-lg p-6">
        <div className="w-full aspect-w-16 aspect-h-9 relative mb-6 overflow-hidden rounded-md">
          <Image
            src="/images/landing.png"
            alt="Flash"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h2 className="text-3xl font-secondary font-medium text-left mb-4">
          Imagen
        </h2>
        <p className="text-lg text-muted-foreground mb-6 text-start">
          Imagen lets you create stunning visuals effortlessly. Generate
          high-quality images based on your custom prompts, perfect for creative
          projects, design inspiration, or showcasing ideas.
        </p>
        <div className="flex justify-center w-full">
          <Button
            asChild
            className="bg-[#0f172a] text-lg font-semibold py-5 text-white w-full hover:bg-[#1e293b]"
          >
            <Link href="/dashboard/generate">
              Imagen <ExternalLink size={30} className="inline-block ml-2" />{" "}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

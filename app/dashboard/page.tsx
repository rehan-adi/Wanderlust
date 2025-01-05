"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrainCircuit, ExternalLink, Image } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800 flex justify-center items-center flex-col md:flex-row gap-1 md:gap-8 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-[30vw] bg-white border mt-14 md:mt-0 shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-secondary font-medium text-left mb-5">
        <BrainCircuit size={22} className="inline-block mr-2"/>  Flash
        </h2>
        <p className="text-lg text-muted-foreground mb-6 text-start">
          Flash helps you generate simple code snippets, text content, and even
          question-answer pairs effortlessly. Designed to speed up your
          development and simplify your workflow.
        </p>
        <div className="flex justify-center w-full">
          <Button
            asChild
            className="bg-black text-base font-semibold py-5 text-white w-full"
          >
            <Link href="/dashboard/chat">
              Explore Flash{" "}
              <ExternalLink size={30} className="inline-block ml-2" />{" "}
            </Link>
          </Button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full md:w-[30vw] mt-16 md:mt-0 bg-white border shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-secondary font-medium text-left mb-5">
        <Image size={22} className="inline-block mr-1"/>   Imagen
        </h2>
        <p className="text-lg text-muted-foreground mb-6 text-start">
          Imagen lets you create stunning visuals effortlessly. Generate
          high-quality images based on your custom prompts, perfect for creative
          projects, design inspiration, or showcasing ideas.
        </p>
        <div className="flex justify-center w-full">
          <Button
            asChild
            className="bg-black text-base font-semibold py-5 text-white w-full"
          >
            <Link href="/dashboard/generate">
              Explore Imagen{" "}
              <ExternalLink size={30} className="inline-block ml-2" />{" "}
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

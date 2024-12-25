import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Wanderlust - AI Generated Images",
  description: "Advanced ChatGPT and Image Generation Service",
};

export default function Home() {
  return (
    <div className="min-h-screen w-full flex md:px-40 px-4 pt-20 pb-10 items-center">
      <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-12 gap-10 items-center">
        <div className="space-y-8 lg:pt-12 pt-4 h-full">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Unleash the Power of{" "}
              <span className="inline-block relative bg-black text-white px-2 py-1 transform rotate-1">
                AI Innovation
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-[600px]">
              Unlock the power of AI to create stunning images, generate text,
              and write code with ease. Whether you're designing or building
              apps, our tools help boost your creativity and productivity.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-[#0f172a] text-white hover:bg-[#1e293b]"
            >
              <Link href="/dashboard">
                Browse services <MoveRight className="inline-block" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/gallery">
                Explore Gallery <MoveRight className="inline-block" />
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <div className="flex -space-x-2">
              <Image
                src="/images/man.png"
                alt="Supporter 1"
                width={40}
                height={40}
                className="rounded-full border-2 border-background"
              />
              <Image
                src="/images/woman.png"
                alt="Supporter 2"
                width={40}
                height={40}
                className="rounded-full border-2 border-background"
              />
              <Image
                src="/images/man1.png"
                alt="Supporter 3"
                width={40}
                height={40}
                className="rounded-full border-2 border-background"
              />
              <Image
                src="/images/boy-avatar.svg"
                alt="Supporter 4"
                width={40}
                height={40}
                className="rounded-full border-2 border-background"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              1000+ Supporters 🎉
            </span>
          </div>
        </div>
        <div className="relative m:mt-24">
          <div className="relative aspect-square">
            <Image
              src="/images/landing.png"
              alt="image"
              className="rounded-lg"
              width={400}
              height={400}
              priority
            />
          </div>
          {/* Badge with text */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              The Best AI Art Generator
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

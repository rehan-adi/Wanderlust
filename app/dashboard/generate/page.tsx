"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2, Download, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImageGenerator() {

  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post("/api/generate", {
        prompt,
      });

      const imageUrl = response.data.imageUrl;
      setGeneratedImage(imageUrl);
    } catch (error: any) {
      console.error("Error generating image:", error);
      const message =
        error.response?.data?.message || "An error occurred. Please try again.";
      toast.error("Error generating image", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "generated-image.jpg";
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  return (
    <div className="w-full min-h-screen pt-24 px-4 py-8">

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Create with Imagen for free</h1>
        <p className="text-sm text-muted-foreground">
          Transform Text into Stunning Images in Seconds with Imagen
        </p>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full gap-6 md:px-36 px-4">
      <Card className="sm:w-full md:w-auto">
          <CardHeader>
            <CardTitle>Imagen AI Image Generator</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select a style, type to get your own flux ai image
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Input
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your Flux.1 AI Image, Default: a person"
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seed">Seed (Optional)</Label>
              <Input
                id="seed"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Random Seed, useful for generating the same style image"
              />
            </div>

            <Button
              onClick={handleGenerateImage}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Imagen AI Image Generator Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
          {generatedImage ? (
              <div className="rounded-lg flex items-center justify-center">
                <img
                  src={generatedImage}
                  alt="Generated image"
                  className="rounded-lg object-cover w-full md:w-[80%] lg:w-[50%] h-[auto] max-h-[50vh]"
                />
              </div>
            ) : (
              <div className="rounded-lg flex items-center justify-center">
                <img
                  src="/placeholder.svg"
                  alt="Generated image"
                  className="rounded-lg object-cover md:w-[80%] lg:w-[80%] h-[auto] max-h-[50vh]"
                />
              </div>
            )}
            <div className="flex mt-3 gap-2">
              <Button
                variant="outline"
                className="flex-1 text-sm py-2"
                onClick={() => generatedImage && downloadImage(generatedImage)}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button variant="secondary" className="flex-1 text-sm py-2">
                <Wand2 className="w-4 h-4 mr-1" />
                Enhance HD
              </Button>
              <Button variant="secondary" className="flex-1 text-sm py-2">
                <Edit className="w-4 h-4 mr-1" />
                Edit Image
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
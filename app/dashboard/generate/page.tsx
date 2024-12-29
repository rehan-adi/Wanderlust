"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Edit, Fullscreen, Info, Loader2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | undefined>(
    undefined
  );

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post("/api/generate", {
        prompt,
      });

      const imageUrl = response.data.imageUrl;
      setGeneratedImage(imageUrl);
      setPrompt("");
      setSeed("");
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

  const togglePreview = () => {
    setIsPreviewing((prev) => !prev);
    setIsModalOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen pt-24 px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="md:text-4xl text-2xl font-bold mb-2">
          Create with Imagen
        </h1>
        <p className="text-base font-semibold text-muted-foreground">
        Transform Text into Stunning Images in a Few Minutes with Imagen.
        </p>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full gap-6 md:px-36 px-0">
        <Card className="sm:w-full md:w-auto">
          <CardHeader className="space-y-4">
            <CardTitle className="text-xl">Imagen AI Image Generator</CardTitle>
            <p className="text-base text-muted-foreground">
              Create unique images by providing a descriptive prompt and
              optional seed. The prompt defines the image's theme, while the
              seed ensures consistent styles across generations. Please refrain
              from generating explicit or inappropriate content.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Input
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a description for your AI image (e.g., 'futuristic city at sunset')."
                className="resize-none py-5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seed">Seed (Optional)</Label>
              <Input
                id="seed"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                className="py-5"
                placeholder="Random Seed, useful for generating the same style image"
              />
            </div>

            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Info size={17} className="mt-0.5" />
              <p>
                info: Image generation may take a few seconds. Thank you for
                your patience!
              </p>
            </div>

            <Button
              onClick={handleGenerateImage}
              disabled={loading}
              className="w-full py-5"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin w-5 h-5" />{" "}
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">
              Imagen AI Image Generator Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedImage ? (
              <div className="rounded-lg flex items-center justify-center">
                <img
                  src={generatedImage}
                  alt="Generated image"
                  className="rounded-lg object-cover w-full h-[auto] max-h-[50vh]"
                />
              </div>
            ) : (
              <div className="rounded-lg flex items-center justify-center">
                <img
                  src="/placeholder.svg"
                  alt="default image"
                  className="rounded-lg object-cover w-full h-[auto] max-h-[50vh]"
                />
              </div>
            )}
            <div className="flex md:flex-row flex-col mt-3 gap-2">
              <Button
                variant="outline"
                className="flex-1 text-sm py-2"
                onClick={() => generatedImage && downloadImage(generatedImage)}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={togglePreview}
                className="flex-1 text-sm py-2"
              >
                <Fullscreen className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button variant="outline" className="flex-1 text-sm py-2">
                <Edit className="w-4 h-4 mr-1" />
                Edit Image
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 h-screen w-full z-50">
          <div className="relative w-full h-full max-w-[90vw] max-h-[100vh] mx-auto my-auto md:py-16 py-40">
            <button
              onClick={closeModal}
              className="absolute top-3 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-300 focus:outline-none"
            >
              <X size={20} />
            </button>
            <img
              src={generatedImage}
              alt="Preview"
              className="rounded-xl max-w-full max-h-full object-contain mx-auto my-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

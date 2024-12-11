"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Upload,
  Crop,
  ImagePlus,
  Sticker,
  Download,
  Undo,
  Redo,
  Palette,
} from "lucide-react";

const ImageEditor = () => {
  const [activeTab, setActiveTab] = useState("crop");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen px-2 mb-7 mt-20">
      <Card className="w-full max-w-6xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Image Editor
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image Section */}
            <div className="w-full lg:w-2/3">
              <AspectRatio
                ratio={16 / 9}
                className="bg-muted rounded-lg overflow-hidden border-2 border-muted-foreground/20"
              >
                {image ? (
                  <Image
                    src={image}
                    alt="Editable image"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Button
                      variant="outline"
                      onClick={handleUploadClick}
                      className="text-lg"
                    >
                      <Upload className="h-6 w-6 mr-2" />
                      Upload an image
                    </Button>
                  </div>
                )}
              </AspectRatio>
            </div>

            {/* Controls Section */}
            <div className="w-full lg:w-1/3">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger
                    value="crop"
                    className="flex items-center justify-center"
                  >
                    <Crop className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Crop</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="resize"
                    className="flex items-center justify-center"
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Resize</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="stickers"
                    className="flex items-center justify-center"
                  >
                    <Sticker className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Stickers</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="filters"
                    className="flex items-center justify-center"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Filters</span>
                  </TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[300px] lg:h-[400px] rounded-md border p-4">
                  <TabsContent value="crop" className="space-y-4">
                    <h3 className="text-lg font-semibold">Crop Image</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        16:9
                      </Button>
                      <Button variant="outline" size="sm">
                        4:3
                      </Button>
                      <Button variant="outline" size="sm">
                        1:1
                      </Button>
                      <Button variant="outline" size="sm">
                        Free
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="resize" className="space-y-4">
                    <h3 className="text-lg font-semibold">Resize Image</h3>
                    <Slider defaultValue={[100]} max={200} step={1} />
                    <div className="text-sm text-muted-foreground">
                      Size: 100%
                    </div>
                  </TabsContent>

                  <TabsContent value="stickers" className="space-y-4">
                    <h3 className="text-lg font-semibold">Add Stickers</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-accent/20 rounded-md hover:bg-accent/40 transition-colors duration-200 cursor-pointer"
                        ></div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="filters" className="space-y-4">
                    <h3 className="text-lg font-semibold">Apply Filters</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        Grayscale
                      </Button>
                      <Button variant="outline" size="sm">
                        Sepia
                      </Button>
                      <Button variant="outline" size="sm">
                        Invert
                      </Button>
                      <Button variant="outline" size="sm">
                        Blur
                      </Button>
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </div>
          </div>

          {/* Footer Section with Controls */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleUploadClick}>
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload</span>
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button variant="outline" size="icon">
                <Undo className="h-4 w-4" />
                <span className="sr-only">Undo</span>
              </Button>
              <Button variant="outline" size="icon">
                <Redo className="h-4 w-4" />
                <span className="sr-only">Redo</span>
              </Button>
            </div>
            <Button disabled={!image}>
              <Download className="h-4 w-4 mr-2" />
              Save Image
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageEditor;

import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (imageBuffer: Buffer) => {
  try {
    if (!imageBuffer) return null;

    const response = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return null;
        }
        return result;
      }
    );

    const bufferStream = Readable.from(imageBuffer);
    bufferStream.pipe(response);
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

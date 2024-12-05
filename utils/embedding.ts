import axios from "axios";

export const getImageEmbedding = async (
  imageBuffer: Buffer
): Promise<number[]> => {
  try {
    const base64Image = imageBuffer.toString("base64");

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32",
      base64Image,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Embedding Response:", response.data);
    return response.data.embedding;
  } catch (error: any) {
    console.error(
      "Error generating embedding:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get image embedding");
  }
};

import axios from "axios";

export const getImageEmbedding = async (
  imageUrl: string
): Promise<number[]> => {
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32",
    { image: imageUrl },
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
      },
    }
  );
  console.log(response.data);
  return response.data.embedding;
};

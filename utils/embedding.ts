import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

export const getTextEmbedding = async (prompt: string): Promise<number[]> => {
  try {
    const response = await model.embedContent(prompt);
    return response.embedding.values;
  } catch (error: any) {
    if (error.response) {
      console.error(
        "API Response Error:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Request Error:", error.message);
    }
    throw new Error("Failed to get text embedding");
  }
};

import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 0.5,
  topP: 0.9,
  topK: 50,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

type ChatEntry = Content;

let chatHistory: ChatEntry[] = [];

/**
 * Sends a prompt to the Gemini model and returns the response.
 * Updates history dynamically for contextual conversations.
 * @param {string} prompt - The input prompt to send to the model.
 * @returns {Promise<string>} - The response text from the model.
 */
export async function sendPrompt(prompt: string): Promise<string> {
  if (!prompt || prompt.trim() === "") {
    throw new Error("Prompt cannot be empty or whitespace.");
  }

  // Add the user input to the chat history
  chatHistory.push({ role: "user", parts: [{ text: prompt }] });

  const chatSession = model.startChat({
    generationConfig,
    history: chatHistory,
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();

    // Add model's response to history
    chatHistory.push({
      role: "model",
      parts: [{ text: responseText }],
    });

    return responseText;
  } catch (error) {
    console.error("Error interacting with the model:", error);
    throw new Error("Failed to process the prompt. Please try again later.");
  }
}

export function clearChatHistory(): void {
  chatHistory = [];
}

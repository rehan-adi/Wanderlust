import { PINECONE_API_KEY } from "@/config/config";
import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

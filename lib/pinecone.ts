import { Pinecone } from "@pinecone-database/pinecone";

const PINECONE_API_KEY = process.env.PINECONE_API_KEY as string;

export const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

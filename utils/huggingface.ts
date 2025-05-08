import { HUGGINGFACE_API_KEY } from "@/config/config";
import { InferenceClient } from "@huggingface/inference";

export const client = new InferenceClient(HUGGINGFACE_API_KEY);

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Get the directory path for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to your .env file (adjust if needed)
const envPath = resolve(__dirname, "../../.env");

// Load environment variables
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.warn("Error loading .env file:", result.error);
}

export const env = {
  PORT: parseInt(process.env.PORT || "3000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  TTS_SERVICE_URL: process.env.TTS_SERVICE_URL || "http://kokoro-tts:8880",
  OLLAMA_API_URL: process.env.OLLAMA_API_URL || "http://llm-service:11434",
  STT_SERVICE_URL: process.env.STT_SERVICE_URL || "http://whisper-stt:9000",
};

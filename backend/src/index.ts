import express from "express";
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;
export const TTS_SERVICE_URL =
  process.env.TTS_SERVICE_URL || "http://kokoro-tts:8880";

export const OLLAMA_API_URL =
  process.env.OLLAMA_API_URL || "http://llm-service:11434";

export const STT_SERVICE_URL =
  process.env.STT_SERVICE_URL || "http://whisper-stt:9000";

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT} 🚶`);
  console.log(`TTS service URL ${TTS_SERVICE_URL} 🚶`);
  console.log(`Ollama service URL ${OLLAMA_API_URL} 🚶`);
  console.log(`STT service URL ${STT_SERVICE_URL} 🚶`);
});

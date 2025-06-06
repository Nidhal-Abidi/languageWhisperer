import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import { env } from "./config/env.js";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sessionsDir = path.join(__dirname, "..", "audio", "sessions");

const app = express();
const PORT = env.PORT;
export const TTS_SERVICE_URL = env.TTS_SERVICE_URL;
export const OLLAMA_API_URL = env.OLLAMA_API_URL;
export const STT_SERVICE_URL = env.STT_SERVICE_URL;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(
  "/sessions",
  express.static(sessionsDir, { acceptRanges: true, maxAge: "1h" })
);
app.use(router);

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT} 🚶`);
  console.log(`TTS service URL ${TTS_SERVICE_URL} 🚶`);
  console.log(`Ollama service URL ${OLLAMA_API_URL} 🚶`);
  console.log(`STT service URL ${STT_SERVICE_URL} 🚶`);
});

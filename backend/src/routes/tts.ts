import { Router } from "express";
import axios from "axios";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {
  filterVoices,
  validateQuery,
  validateSpeechGenerationBody,
} from "../utils/TTSUtils.js";
import { TTS_SERVICE_URL } from "../index.js";

const router = Router();

router.get("/health/backend", (req, res) => {
  res.status(200).json({ status: "ok", service: "backend" });
});

// Get all the voices with optional filtering through query parameters
router.get("/api/voices", validateQuery, async (req, res) => {
  try {
    const { language, gender } = res.locals.validatedQuery;
    const { data } = await axios(`${TTS_SERVICE_URL}/v1/audio/voices`);
    const filteredVoices = filterVoices(data.voices, language, gender);
    res.send(filteredVoices);
  } catch (error) {
    throw error;
  }
});

router.post(
  "/api/text/speech",
  validateSpeechGenerationBody,
  async (req, res) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `${TTS_SERVICE_URL}/v1/audio/speech`,
        data: {
          input: res.locals.validatedBody.input,
          voice: res.locals.validatedBody.voice,
          speed: res.locals.validatedBody.speed,
        },
        responseType: "arraybuffer",
      });
      // Define a file name and path; adjust the directory as needed.
      const outputFileName = `model_${Date.now()}.mp3`;
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const outputPath = path.join(__dirname, "../../audio", outputFileName);

      // Write the binary data to file
      fs.writeFileSync(outputPath, data);
      res.send({
        message: "Voice created and file saved",
        file: outputFileName,
      });
    } catch (error) {
      console.error("Error during TTS generation:", error);
      res.status(500).send("Error generating voice");
    }
  }
);

export default router;

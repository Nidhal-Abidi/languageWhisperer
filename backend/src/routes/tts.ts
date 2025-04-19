import { NextFunction, Request, Response, Router } from "express";
import {
  languageCodes,
  Languages,
  speechGenerationBodySchema,
  voiceQuerySchema,
} from "../schema/textToSpeech.schema";
import { TTS_SERVICE_URL } from "..";
import axios from "axios";
import fs from "fs";
import path from "path";

const router = Router();

router.get("/health/backend", (req, res) => {
  res.status(200).json({ status: "ok", service: "backend" });
});

const validateQuery = (req: Request, res: Response, next: NextFunction) => {
  const result = voiceQuerySchema.safeParse(req.query);
  if (!result.success) {
    res.status(400).send(result.error);
    return;
  }
  res.locals.validatedQuery = result.data;
  next();
};

const filterVoices = (
  voices: Array<string>,
  language: Languages,
  gender: "male" | "female"
) => {
  let filteredVoices = [...voices];

  if (language) {
    const langCode = languageCodes[language];

    // For English (both American and British), we need special handling
    if (language === "american-english") {
      filteredVoices = filteredVoices.filter((voice) => voice.startsWith("a"));
    } else if (language === "british-english") {
      filteredVoices = filteredVoices.filter((voice) => voice.startsWith("b"));
    } else {
      filteredVoices = filteredVoices.filter((voice) =>
        voice.startsWith(langCode)
      );
    }
  }

  if (gender) {
    const genderCode = gender[0]; // 'm' for male, 'f' for female
    filteredVoices = filteredVoices.filter((voice) => voice[1] === genderCode);
  }

  return filteredVoices;
};

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

const validateSpeechGenerationBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = speechGenerationBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send(result.error);
    return;
  }
  res.locals.validatedBody = result.data;
  next();
};

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
      const outputPath = path.join(__dirname, "../../audio", outputFileName);

      // Write the binary data to file
      fs.writeFileSync(outputPath, data);
      console.log("Audio file saved at:", outputPath);
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

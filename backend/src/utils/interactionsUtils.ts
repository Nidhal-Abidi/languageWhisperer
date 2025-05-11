import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "node:fs";
import multer from "multer";
import { getDirectories } from "./sessionUtils.js";
import axios from "axios";
import { availableVoices, languageCodes } from "../schema/tts.schema.js";
import { TTS_SERVICE_URL } from "../index.js";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

export const createNewInteractionsSubFolder = async (sessionId: string) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const interactionsDirPath = path.join(
    __dirname,
    "../../audio/sessions",
    sessionId,
    "interactions"
  );
  await fs.promises.mkdir(interactionsDirPath, { recursive: true });

  const existingInteractions = await getDirectories(interactionsDirPath);

  let interactionsSubFolder = "";
  if (existingInteractions.length === 0) {
    // We have to create the first interactions subfolder called `1`
    interactionsSubFolder = path.join(interactionsDirPath, "1");
  } else {
    // We have to create the next interactions subfolder.
    const nextInteractionNumber =
      Number(existingInteractions[existingInteractions.length - 1]) + 1;

    interactionsSubFolder = path.join(
      interactionsDirPath,
      nextInteractionNumber.toString()
    );
  }

  await fs.promises.mkdir(interactionsSubFolder, { recursive: true });

  return interactionsSubFolder;
};

export const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const interactionsSubFolder = await createNewInteractionsSubFolder(
      req.params.session_id
    );
    cb(null, interactionsSubFolder);
  },
  filename: (req, file, cb) => {
    cb(null, "user.webm");
  },
});

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.fieldname !== "userRecording") {
    return cb(new Error("Field name must be 'userRecording'"));
  }

  if (!["audio/webm", "audio/mpeg"].includes(file.mimetype)) {
    return cb(new Error("File must be a WebM or MP3 audio recording"));
  }

  cb(null, true);
};

export const validateSessionId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if the session_id exists
  const {
    params: { session_id },
  } = req;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const sessionPath = path.join(__dirname, "../../audio/sessions", session_id);
  if (!fs.existsSync(sessionPath)) {
    res.status(404).send(`The requested session ${session_id} doesn't exist`);
    return;
  }
  res.locals.sessionPath = sessionPath;
  next();
};

export const loadSessionMeta = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const metaDataFilePath = res.locals.sessionPath + "/meta.json";
  res.locals.sessionMetaData = JSON.parse(
    fs.readFileSync(metaDataFilePath, "utf-8")
  );
  res.locals.userAudioFileStart = Date.now();
  next();
};

export const saveTranslationToJson = (
  original: string,
  translation: string,
  filePath: string
) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify({ original, translation }),
    "utf-8"
  );
};

export const saveInteractionTranscription = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const llmResponse = res.locals.llmResponse;
  // Save the interaction into user.json & assistant.json
  const userFilePath = req.file!.destination + "/user.json";
  const assistantFilePath = req.file!.destination + "/assistant.json";
  const userJsonFileStart = Date.now();
  saveTranslationToJson(
    llmResponse.userOriginal,
    llmResponse.userTranslation,
    userFilePath
  );
  res.locals.userJsonFileTime = Date.now() - userJsonFileStart;
  const assistantJsonFileStart = Date.now();
  saveTranslationToJson(
    llmResponse.assistantOriginal,
    llmResponse.assistantTranslation,
    assistantFilePath
  );
  res.locals.assistantJsonFileTime = Date.now() - assistantJsonFileStart;
  next();
};

export const generateAudioResponseFromText = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chosenAudioVoice = getAudioVoice(
      res.locals.sessionMetaData.conversationLanguage
    );
    const ttsStart = Date.now();
    const { data } = await axios({
      method: "post",
      url: `${TTS_SERVICE_URL}/v1/audio/speech`,
      data: {
        input: res.locals.llmResponse.assistantOriginal,
        voice: chosenAudioVoice,
      },
      responseType: "arraybuffer",
    });
    res.locals.TTSTime = Date.now() - ttsStart;
    // Define a file name and path; adjust the directory as needed.
    const outputFileName = "assistant.mp3";
    const outputPath = path.join(
      res.locals.interactionsDirPath,
      outputFileName
    );
    const assistantAudioFileStart = Date.now();
    // Write the binary data to file
    fs.writeFileSync(outputPath, data);
    res.locals.assistantAudioFileTime = Date.now() - assistantAudioFileStart;
    console.log("Audio file saved at:", outputPath);
    next();
  } catch (error) {
    console.error("Error during TTS generation:", error);
    res.status(500).send("Error generating voice");
  }
};

type AvailableLanguages =
  | "american-english"
  | "british-english"
  | "spanish"
  | "portuguese"
  | "french"
  | "japanese"
  | "hindi"
  | "italian"
  | "mandarin";

const getAudioVoice = (language: AvailableLanguages) => {
  const currentLanguageCode = languageCodes[language];
  return availableVoices.find((voice) => voice.startsWith(currentLanguageCode));
};

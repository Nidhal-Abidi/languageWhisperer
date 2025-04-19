import { Router } from "express";
import {
  storage,
  fileFilter,
  validateSessionId,
  loadSessionMeta,
  saveInteractionTranscription,
} from "../utils/interactionsUtils";
import multer from "multer";
import { transcribeAudio } from "../utils/STTUtils";
import { Session } from "../schema/session.schema";
import { LLMClient } from "../utils/LLMClient";

const llm = new LLMClient();

const router = Router();

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

// 3. generate audio using TTS
// 4. Return last interactions folder path (eg. `backend/audio/sessions/:session_id/interactions/003`)
/* 
All the files inside of the interactions folder will have the same files after this request:
    user.webm
    user.json       // Contains { userOriginal: string; userTranslation: string }
    assistant.mp3
    assistant.json  // Contains { assistantOriginal: string; assistantTranslation: string }
*/
router.post(
  `/api/sessions/:session_id/interactions`,
  validateSessionId,
  loadSessionMeta,
  upload.single("userRecording"),
  async (req, res, next) => {
    if (!req.file) {
      res.status(400).json({ error: "Missing 'userRecording' file" });
    }
    // Use STT model to transcribe the model
    const audioRecordingPath = req.file!.destination + "/user.webm";
    let transcription = await transcribeAudio(audioRecordingPath);
    transcription = transcription.replace(/(\r\n|\n|\r)/gm, "");

    // Get the scenario, conversation/translation languages and language proficiency from `meta.json`
    const metaData: Session = res.locals.sessionMetaData;
    // Get the response from the LLM
    const llmResponse = await llm.generateResponse(
      transcription,
      metaData.scenario,
      metaData.conversationLanguage,
      metaData.translationLanguage,
      metaData.languageProficiency
    );
    res.locals.llmResponse = llmResponse;
    console.log("LLM Response -->", llmResponse);
    next();
  },
  saveInteractionTranscription,
  (req, res, next) => {
    res.status(201).json({ message: "Audio file uploaded successfully" });
  }
);

export default router;

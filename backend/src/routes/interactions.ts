import { Router } from "express";
import {
  storage,
  fileFilter,
  validateSessionId,
  loadSessionMeta,
  saveInteractionTranscription,
  generateAudioResponseFromText,
} from "../utils/interactionsUtils.js";
import multer from "multer";
import { transcribeAudio } from "../utils/STTUtils.js";
import { Session } from "../schema/session.schema.js";
import { LLMClient } from "../utils/LLMClient.js";

const llm = new LLMClient();

const router = Router();

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

// Return last interactions folder path (eg. `backend/audio/sessions/:session_id/interactions/003`)
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
    res.locals.userAudioFileTime = Date.now() - res.locals.userAudioFileStart;
    // Use STT model to transcribe the model
    const audioRecordingPath = req.file!.destination + "/user.webm";
    const sttStart = Date.now();
    let transcription = await transcribeAudio(audioRecordingPath);
    res.locals.STTTime = Date.now() - sttStart;
    transcription = transcription.replace(/(\r\n|\n|\r)/gm, "");

    // Get the scenario, conversation/translation languages and language proficiency from `meta.json`
    const metaData: Session = res.locals.sessionMetaData;
    const llmStart = Date.now();
    // Get the response from the LLM
    const llmResponse = await llm.generateResponse(
      transcription,
      metaData.scenario,
      metaData.conversationLanguage,
      metaData.translationLanguage,
      metaData.languageProficiency
    );
    res.locals.llmTime = Date.now() - llmStart;
    res.locals.llmResponse = llmResponse;
    res.locals.interactionsDirPath = req.file!.destination;
    next();
  },
  saveInteractionTranscription,
  generateAudioResponseFromText,
  (req, res, next) => {
    res.status(201).json({
      message:
        "Interaction completed successfully, Waiting for the user to reply!",
      processingTimes: {
        STTduration: res.locals.STTTime,
        LLMduration: res.locals.llmTime,
        TTSduration: res.locals.TTSTime,
        saveUserJsonFileDuration: res.locals.userJsonFileTime,
        saveAssistantJsonFileDuration: res.locals.assistantJsonFileTime,
        saveUserAudioFileDuration: res.locals.userAudioFileTime,
        saveAssistantAudioFileDuration: res.locals.assistantAudioFileTime,
      },
    });
  }
);

export default router;

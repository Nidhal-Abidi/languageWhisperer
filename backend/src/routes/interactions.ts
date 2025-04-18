import { Router } from "express";
import {
  storage,
  fileFilter,
  validateNewInteraction,
} from "../utils/interactionsUtils";
import multer from "multer";
import { transcribeAudio } from "../utils/STTUtils";

const router = Router();

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

// 3. create the response using LLM, generate audio using TTS
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
  validateNewInteraction,
  upload.single("userRecording"),
  async (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "Missing 'userRecording' file" });
    }
    // Use STT model to transcribe the model
    const audioRecordingPath = req.file!.destination + "/user.webm";
    const transcription = await transcribeAudio(audioRecordingPath);

    res.status(201).json({ message: "Audio file uploaded successfully" });
  }
);

export default router;

import { Router } from "express";
import { storage,fileFilter, validateNewInteraction } from "../utils/interactionsUtils";
import multer from "multer";


const router = Router()

const upload = multer({ 
    storage, 
    fileFilter,
    limits: {
      fileSize: 50 * 1024 * 1024, 
    }
  });

// 3. Transcribe the audio using STT, create the response using LLM, generate audio using TTS
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
    (req, res) => {
      if (!req.file) {
        res.status(400).json({ error: "Missing 'userRecording' file" });
      }
  
      res.status(201).json({ message: "Audio file uploaded successfully"});
      
    }
);

export default router
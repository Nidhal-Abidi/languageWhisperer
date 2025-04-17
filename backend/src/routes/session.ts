import { NextFunction, Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "node:fs";
import multer from "multer";
import { sessionSchema } from "../schema/session.schema";
import { getDirectories, saveSessionData } from "../utils/sessionUtils";
import { interactionSchema } from "../schema/interaction.schema";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const sessionId = req.params.session_id;
    const interactionsDirPath = path.join(
      __dirname,
      "../../audio/sessions",
      sessionId,
      "interactions"
    );
    if (!fs.existsSync(interactionsDirPath)) {
      // Create the interactions folder
      fs.mkdirSync(interactionsDirPath, { recursive: true });
    }
    const existingInteractions = await getDirectories(interactionsDirPath);

    let interactionsSubFolder = "";
    if (existingInteractions.length === 0) {
      // We have to create the first interactions subfolder called `1`
      interactionsSubFolder = path.join(interactionsDirPath, "1");
      fs.mkdirSync(interactionsSubFolder, { recursive: true });
    } else {
      // We have to create the next interactions subfolder.
      const nextInteractionNumber =
        Number(existingInteractions[existingInteractions.length - 1]) + 1;

      interactionsSubFolder = path.join(
        interactionsDirPath,
        nextInteractionNumber.toString()
      );
      fs.mkdirSync(interactionsSubFolder, { recursive: true });
    }

    cb(null, interactionsSubFolder);
  },
  filename: (req, file, cb) => {
    cb(null, "user.webm");
  },
});

const upload = multer({ storage });

const router = Router();

const validateNewSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = sessionSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send(result.error);
    return;
  }
  res.locals.validatedNewSession = result.data;
  next();
};

const createSessionId = () => uuidv4();

// Save the data of the session into backend/audio/sessions/{session_id}/meta.json
router.post("/api/sessions", validateNewSession, (req, res) => {
  const session_id = createSessionId();
  try {
    saveSessionData(session_id, res.locals.validatedNewSession);
    res.status(201).json({
      message: "Session created successfully",
      session_id,
      meta_path: `/audio/sessions/${session_id}/meta.json`,
    });
  } catch (error) {
    console.error("Session creation failed:", error);
    res.status(500).json({
      error: "Failed to create session",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

const validateNewInteraction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if the session_id exists
  const {
    params: { session_id },
  } = req;
  const sessionsDirPath = path.join(
    __dirname,
    "../../audio/sessions",
    session_id
  );
  if (!fs.existsSync(sessionsDirPath)) {
    res.status(404).send(`The requested session ${session_id} doesn't exist`);
  }
  /* // check if the data is available
  const result = interactionSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send(result.error);
    return;
  }
  res.locals.validatedNewInteraction = result.data; */
  next();
};

// 1. Create the folder if it's not available `backend/audio/sessions/:session_id/interactions`
// 2. Check the folder containing the number of the last interaction
// 2.1. If it exists (eg. 001), create a new folder with index + 1 (e.g. 002)
// 2.2. If the folder interactions is empty create the first folder `001`
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
  upload.single("recording"),
  (req, res) => {
    res.send("The folder exists");
  }
);

export default router;

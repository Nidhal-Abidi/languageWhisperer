import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { saveSessionData, validateNewSession } from "../utils/sessionUtils.js";

const router = Router();

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

export default router;

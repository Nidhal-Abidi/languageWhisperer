import { Router } from "express";
import textToSpeechRouter from "./tts.js";
import languagePracticeRouter from "./llm.js";
import sessionRouter from "./session.js";
import interactionsRouter from "./interactions.js";

const router = Router();

router.use(textToSpeechRouter);
router.use(languagePracticeRouter);
router.use(sessionRouter);
router.use(interactionsRouter);

export default router;

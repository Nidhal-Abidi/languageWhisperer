import { Router } from "express";
import textToSpeechRouter from "./textToSpeech";
import languagePracticeRouter from "./languagePractice";
import sessionRouter from "./session";
import interactionsRouter from "./interactions"

const router = Router();

router.use(textToSpeechRouter);
router.use(languagePracticeRouter);
router.use(sessionRouter);
router.use(interactionsRouter);

export default router;

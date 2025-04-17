import { Router } from "express";
import textToSpeechRouter from "./textToSpeech";
import languagePracticeRouter from "./languagePractice";
import sessionRouter from "./session";

const router = Router();

router.use(textToSpeechRouter);
router.use(languagePracticeRouter);
router.use(sessionRouter);

export default router;

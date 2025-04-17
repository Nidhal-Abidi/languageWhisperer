import { NextFunction, Request, Response, Router } from "express";
import { LLMClient } from "../utils/LLMClient";
import { generateResponseSchema } from "../schema/languagePractice.schema";

const router = Router();
const llm = new LLMClient();

const validateGenerateResponseBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = generateResponseSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send(result.error);
    return;
  }
  res.locals.validatedGenerateResponseBody = result.data;
  next();
};

router.post("/api/reset-conversation", (req, res) => {
  llm.resetTheConversation();
  res.send();
});

router.post(
  "/api/generate-response",
  validateGenerateResponseBody,
  async (req, res) => {
    const {
      userMessage,
      scenario,
      conversationLanguage,
      translationLanguage,
      languageProficiency,
    } = res.locals.validatedGenerateResponseBody;
    const response = await llm.generateResponse(
      userMessage,
      scenario,
      conversationLanguage,
      translationLanguage,
      languageProficiency
    );
    res.send(response);
  }
);

router.get("/health/llm", async (req, res) => {
  const isHealthy = await llm.checkHealth();
  if (isHealthy) {
    res.status(200).json({ status: "healthy" });
  } else {
    res.status(503).json({ status: "unhealthy" });
  }
});

export default router;

import { z } from "zod";
import { supportedLanguages } from "./tts.schema.js";

export const generateResponseSchema = z
  .object({
    userMessage: z.string().describe("User's message"),
    scenario: z
      .string()
      .optional()
      .describe("Scenario of the conversation between the user and the model"),
    conversationLanguage: z
      .enum(supportedLanguages)
      .optional()
      .describe("The language used for the conversation"),
    translationLanguage: z
      .enum(supportedLanguages)
      .optional()
      .describe("The language that will be used to translate the conversation"),
    languageProficiency: z
      .enum(["A1", "A2", "B1", "B2", "C1", "C2"])
      .optional()
      .describe(
        "The language proficiency: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']"
      ),
  })
  .strict();

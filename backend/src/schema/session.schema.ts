import { z } from "zod";
import { generateResponseSchema } from "./llm.schema";

export const sessionSchema = generateResponseSchema.omit({ userMessage: true });

export type Session = z.infer<typeof sessionSchema>;

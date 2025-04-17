import { z } from "zod";
import { generateResponseSchema } from "./languagePractice.schema";

export const sessionSchema = generateResponseSchema.omit({ userMessage: true });

export type Session = z.infer<typeof sessionSchema>;

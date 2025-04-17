import { z } from "zod";

export const interactionSchema = z
  .object({
    userMessage: z.string().optional(),
  })
  .strict();

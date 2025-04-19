import {
  languageCodes,
  Languages,
  speechGenerationBodySchema,
  voiceQuerySchema,
} from "../schema/textToSpeech.schema";
import { NextFunction, Request, Response } from "express";

export const validateQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = voiceQuerySchema.safeParse(req.query);
  if (!result.success) {
    res.status(400).send(result.error);
    return;
  }
  res.locals.validatedQuery = result.data;
  next();
};

export const filterVoices = (
  voices: Array<string>,
  language: Languages,
  gender: "male" | "female"
) => {
  let filteredVoices = [...voices];

  if (language) {
    const langCode = languageCodes[language];

    // For English (both American and British), we need special handling
    if (language === "american-english") {
      filteredVoices = filteredVoices.filter((voice) => voice.startsWith("a"));
    } else if (language === "british-english") {
      filteredVoices = filteredVoices.filter((voice) => voice.startsWith("b"));
    } else {
      filteredVoices = filteredVoices.filter((voice) =>
        voice.startsWith(langCode)
      );
    }
  }

  if (gender) {
    const genderCode = gender[0]; // 'm' for male, 'f' for female
    filteredVoices = filteredVoices.filter((voice) => voice[1] === genderCode);
  }

  return filteredVoices;
};

export const validateSpeechGenerationBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = speechGenerationBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send(result.error);
    return;
  }
  res.locals.validatedBody = result.data;
  next();
};

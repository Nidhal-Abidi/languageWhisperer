import { z } from "zod";

export const languageCodes = {
  "american-english": "a",
  "british-english": "b",
  spanish: "e",
  portuguese: "p",
  french: "f",
  japanese: "j",
  hindi: "h",
  italian: "i",
  mandarin: "z",
} as const;

export type Languages = keyof typeof languageCodes;

export const supportedLanguages = Object.keys(languageCodes) as [
  keyof typeof languageCodes
];

export const voiceQuerySchema = z
  .object({
    language: z
      .enum(supportedLanguages)
      .optional()
      .describe("Filter voices by language"),
    gender: z
      .enum(["male", "female"])
      .optional()
      .describe("Filter voices by gender"),
  })
  .strict()
  .refine(
    (voiceQuery) => {
      // Handle the special case where French only has a female voice
      if (voiceQuery.language === "french" && voiceQuery.gender === "male") {
        return false;
      }
      return true;
    },
    {
      message: "French language only supports female voices",
    }
  );

export const availableVoices = [
  "af_alloy",
  "af_aoede",
  "af_bella",
  "af_heart",
  "af_jadzia",
  "af_jessica",
  "af_kore",
  "af_nicole",
  "af_nova",
  "af_river",
  "af_sarah",
  "af_sky",
  "af_v0",
  "af_v0bella",
  "af_v0irulan",
  "af_v0nicole",
  "af_v0sarah",
  "af_v0sky",
  "am_adam",
  "am_echo",
  "am_eric",
  "am_fenrir",
  "am_liam",
  "am_michael",
  "am_onyx",
  "am_puck",
  "am_santa",
  "am_v0adam",
  "am_v0gurney",
  "am_v0michael",
  "bf_alice",
  "bf_emma",
  "bf_lily",
  "bf_v0emma",
  "bf_v0isabella",
  "bm_daniel",
  "bm_fable",
  "bm_george",
  "bm_lewis",
  "bm_v0george",
  "bm_v0lewis",
  "ef_dora",
  "em_alex",
  "em_santa",
  "ff_siwis",
  "hf_alpha",
  "hf_beta",
  "hm_omega",
  "hm_psi",
  "if_sara",
  "im_nicola",
  "jf_alpha",
  "jf_gongitsune",
  "jf_nezumi",
  "jf_tebukuro",
  "jm_kumo",
  "pf_dora",
  "pm_alex",
  "pm_santa",
  "zf_xiaobei",
  "zf_xiaoni",
  "zf_xiaoxiao",
  "zf_xiaoyi",
  "zm_yunjian",
  "zm_yunxi",
  "zm_yunxia",
  "zm_yunyang",
] as const;

export const speechGenerationBodySchema = z
  .object({
    input: z
      .string()
      .describe("The text that's going to be transformed into speech."),
    voice: z
      .enum(availableVoices)
      .default("bf_emma")
      .describe("Choose the voice that should read the text"),
    speed: z
      .number()
      .min(0.25, "The speed of the voice can't be lower than 0.25")
      .max(4, "The speed of the voice can't be higher than 4")
      .default(1)
      .describe("The speed of the generated voice"),
  })
  .strict();

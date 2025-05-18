import { describe, it, expect } from "vitest";
import { voiceQuerySchema } from "../../src/schema/tts.schema";

describe("voiceQuerySchema", () => {
  it("should validate voiceQueryData - No filters", () => {
    const validData = {};

    const result = voiceQuerySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should validate voiceQueryData - Language Filter Only", () => {
    const validData = {
      language: "american-english",
    };

    const result = voiceQuerySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should validate voiceQueryData - Gender Filter Only", () => {
    const validData = {
      gender: "male",
    };

    const result = voiceQuerySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should validate voiceQueryData - Gender & Language Filters", () => {
    const validData = {
      language: "portuguese",
      gender: "male",
    };

    const result = voiceQuerySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

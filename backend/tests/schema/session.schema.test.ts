import { describe, it, expect } from "vitest";
import { sessionSchema } from "../../src/schema/session.schema";

describe("sessionSchema", () => {
  it("should validate valid session data", () => {
    const validData = {
      conversationLanguage: "mandarin",
      translationLanguage: "french",
      languageProficiency: "A2",
      scenario: "travel",
    };

    const result = sessionSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should invalidate incorrect data types", () => {
    const invalidData = {
      conversationLanguage: "italian",
      translationLanguage: "french",
      languageProficiency: 123, // Should be a string
      scenario: "travel",
    };

    const result = sessionSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

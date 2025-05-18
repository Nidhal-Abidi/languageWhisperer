import { describe, it, expect } from "vitest";
import { filterVoices } from "../../src/utils/TTSUtils";

describe("filterVoices", () => {
  const voices = [
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
  ];

  it("shouldn't filter the array if no parameters are passed", () => {
    const result = filterVoices(voices);
    expect(result).toEqual(expect.arrayContaining(voices));
  });

  it("should filter the array by Gender (Female voices only)", () => {
    const result = filterVoices(voices, undefined, "female");
    const nonFemaleVoices = result.filter((voice) => {
      if (voice[1] !== "f") {
        return voice;
      }
    });
    expect(nonFemaleVoices).toHaveLength(0);
  });

  it("should filter the array by Gender (Male voices only)", () => {
    const result = filterVoices(voices, undefined, "male");
    const nonMaleVoices = result.filter((voice) => {
      if (voice[1] !== "m") {
        return voice;
      }
    });
    expect(nonMaleVoices).toHaveLength(0);
  });

  it("should filter the array by Language (American English)", () => {
    const result = filterVoices(voices, "american-english");
    const nonAmericanEnglishVoices = result.filter((voice) => {
      if (voice[0] !== "a") {
        return voice;
      }
    });
    expect(nonAmericanEnglishVoices).toHaveLength(0);
  });

  it("should filter the array by Language and Gender (American English - Male)", () => {
    const result = filterVoices(voices, "american-english", "male");
    const nonAmericanEnglishVoices = result.filter((voice) => {
      if (voice[0] !== "a" || voice[1] !== "m") {
        return voice;
      }
    });
    expect(nonAmericanEnglishVoices).toHaveLength(0);
  });
});

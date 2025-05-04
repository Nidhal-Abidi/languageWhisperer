import { ConversationScenarios } from "./ConversationScenarios";
import { LanguageGrid } from "./LanguageGrid";
import { LanguageProficiency } from "./LanguageProficiency";

export const FormFields = () => {
  return (
    <>
      <LanguageProficiency />
      <LanguageGrid type="conversation-language" />
      <LanguageGrid type="translation-language" />
      <ConversationScenarios />
      <div className="flex px-4 py-3 justify-center">
        <button
          type="submit"
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#5583B4] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all duration-300 ease-in-out hover:bg-[#304D6D]"
        >
          Start Practicing
        </button>
      </div>
    </>
  );
};

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
    </>
  );
};

import { useLocation } from "react-router";
import { ConversationContainer } from "./ConversationContainer";
import { Header } from "./Header";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const Session = () => {
  const location = useLocation();
  const {
    state: { formData, sessionData },
  } = location;
  const conversationMetaData = {
    "conversation-language": formData["conversation-language"],
    "translation-language": formData["translation-language"],
    "language-proficiency": formData["language-proficiency"],
    scenario: formData.scenario,
    metaPath: sessionData.meta_path,
    sessionId: sessionData.session_id,
  };
  const [storedFormData, setStoredFormData] =
    useLocalStorage(conversationMetaData);

  console.log("storedFormData -->", storedFormData);
  return (
    <>
      <Header
        conversationLanguage={storedFormData["conversation-language"]}
        translationLanguage={storedFormData["translation-language"]}
        proficiencyLevel={storedFormData["language-proficiency"]}
      />
      <ConversationContainer scenario={storedFormData.scenario} />
    </>
  );
};

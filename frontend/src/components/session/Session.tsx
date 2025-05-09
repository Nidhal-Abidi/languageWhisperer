import { useLocation } from "react-router";
import { ConversationContainer } from "./ConversationContainer";
import { Header } from "./Header";

export const Session = () => {
  const location = useLocation();
  console.log("location -->", location);
  const {
    state: { formData, sessionData },
  } = location;
  return (
    <>
      <Header
        conversationLanguage={formData["conversation-language"]}
        translationLanguage={formData["translation-language"]}
        proficiencyLevel={formData["language-proficiency"]}
      />
      <ConversationContainer scenario={formData.scenario} />
    </>
  );
};

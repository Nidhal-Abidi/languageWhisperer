import { useNavigate, useParams } from "react-router";
import { ConversationContainer } from "./ConversationContainer";
import { Header } from "./Header";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect } from "react";
import { useScrollToPageTop } from "../../hooks/useScrollToPageTop";

export const Session = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { sessionData } = useLocalStorage();

  useEffect(() => {
    if (sessionData) {
      // Validate that the URL's sessionId matches the stored sessionId
      if (sessionId && sessionId !== sessionData.sessionId) {
        console.log("Session ID mismatch - redirecting to form");
        navigate("/", { replace: true });
      }
    }
  }, [sessionData, navigate, sessionId]);

  useScrollToPageTop();

  if (!sessionData) {
    return <div>Loading session...</div>;
  }

  return (
    <>
      <Header
        conversationLanguage={sessionData["conversation-language"]}
        translationLanguage={sessionData["translation-language"]}
        proficiencyLevel={sessionData["language-proficiency"]}
      />
      <ConversationContainer
        scenario={sessionData.scenario}
        sessionId={sessionData.sessionId}
      />
    </>
  );
};

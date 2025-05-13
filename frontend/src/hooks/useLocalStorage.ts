import { useEffect, useState } from "react";
import { LanguageProficiency, Languages } from "../utils/constants";

type Session = {
  "conversation-language": Languages;
  "translation-language": Languages;
  "language-proficiency": LanguageProficiency;
  scenario: string;
  metaPath: string;
  sessionId: string;
};

export const useLocalStorage = (initialSessionData?: Session) => {
  const [sessionData, setSessionData] = useState(() => {
    const data = localStorage.getItem("sessionData");
    return initialSessionData
      ? initialSessionData
      : data
      ? JSON.parse(data)
      : undefined;
  });

  useEffect(() => {
    if (sessionData == undefined) {
      localStorage.removeItem("sessionData");
    } else {
      localStorage.setItem("sessionData", JSON.stringify(sessionData));
    }
  }, [sessionData]);

  const storeSession = (newSessionData: Session) => {
    setSessionData(newSessionData);
  };

  const clearSession = () => {
    setSessionData(undefined);
  };

  return {
    sessionData,
    storeSession,
    clearSession,
  };
};

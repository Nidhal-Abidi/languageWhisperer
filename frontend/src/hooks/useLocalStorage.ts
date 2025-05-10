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

export const useLocalStorage = (sessionData: Session) => {
  const [storedValue, setStoredValue] = useState(() => {
    const data = localStorage.getItem("sessionData");
    return data ? JSON.parse(data) : sessionData;
  });

  useEffect(() => {
    localStorage.setItem("sessionData", JSON.stringify(storedValue));
  }, [storedValue]);

  return [storedValue, setStoredValue];
};

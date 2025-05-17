import { useCallback, useEffect, useState } from "react";
import { Message } from "../components/session/DialogueDisplay";
import { BACKEND_URL } from "../utils/config";

export const useConversationStorage = (initialData?: Message[]) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const data = localStorage.getItem("messages");
    return initialData ? initialData : data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const addMessagePair = useCallback(
    (
      userOriginal: string,
      userTranslation: string,
      assistantOriginal: string,
      assistantTranslation: string,
      userAudioUrl: string,
      assistantAudioUrl: string
    ) => {
      const newMessages: Message[] = [
        {
          sender: "user",
          text: userOriginal,
          translation: userTranslation,
          audioUrl: `${BACKEND_URL}${userAudioUrl}`,
        },
        {
          sender: "bot",
          text: assistantOriginal,
          translation: assistantTranslation,
          audioUrl: `${BACKEND_URL}${assistantAudioUrl}`,
        },
      ];

      setMessages((currentMessages) => [...currentMessages, ...newMessages]);
    },
    []
  );

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    addMessagePair,
    clearMessages,
  };
};

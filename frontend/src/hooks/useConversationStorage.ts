import { useCallback, useEffect, useState } from "react";
import { Message } from "../components/session/DialogueDisplay";

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
      audioFolderName: string
    ) => {
      const newMessages: Message[] = [
        {
          sender: "user",
          text: userOriginal,
          translation: userTranslation,
          audioUrl: audioFolderName,
        },
        {
          sender: "bot",
          text: assistantOriginal,
          translation: assistantTranslation,
          audioUrl: audioFolderName,
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

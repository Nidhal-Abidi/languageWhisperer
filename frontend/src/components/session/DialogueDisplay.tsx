import { useEffect, useState } from "react";
import { ChatMessage } from "./message/ChatMessage";
import { Interaction } from "../../utils/constants";
import { useConversationStorage } from "../../hooks/useConversationStorage";

export type Message = {
  sender: "user" | "bot";
  text: string;
  translation: string;
  audioUrl: string;
};

export const DialogueDisplay = ({
  userOriginal,
  userTranslation,
  assistantOriginal,
  assistantTranslation,
  audioFolderName,
}: Interaction) => {
  const { messages, addMessagePair } = useConversationStorage();

  useEffect(() => {
    if (
      !userOriginal ||
      !userTranslation ||
      !assistantOriginal ||
      !assistantTranslation ||
      !audioFolderName
    ) {
      return;
    }

    addMessagePair(
      userOriginal,
      userTranslation,
      assistantOriginal,
      assistantTranslation,
      audioFolderName
    );
  }, [
    userOriginal,
    userTranslation,
    assistantOriginal,
    assistantTranslation,
    audioFolderName,
    addMessagePair,
  ]);

  // Track which messages have expanded translations
  const [expandedTranslations, setExpandedTranslations] = useState<
    Record<number, boolean>
  >({});

  // Toggle translation visibility
  const toggleTranslation = (index: number) => {
    setExpandedTranslations((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Audio playback state
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  // Simulate audio playback
  const toggleAudio = (index: number) => {
    if (playingAudio === index) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(index);
    }
  };

  return (
    <div className="overflow-y-scroll p-2 max-h-96 flex flex-col w-full mx-auto bg-gray-50 rounded-lg overflow-hidden">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <p>No messages yet.</p>
          <p className="text-xs mt-1">Start speaking to begin the dialogue.</p>
        </div>
      ) : (
        messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            index={index}
            isPlayingAudio={playingAudio === index}
            isTranslationExpanded={expandedTranslations[index]}
            onToggleAudio={toggleAudio}
            onToggleTranslation={toggleTranslation}
          />
        ))
      )}
    </div>
  );
};

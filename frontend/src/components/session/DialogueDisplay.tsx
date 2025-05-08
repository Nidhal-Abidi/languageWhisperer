import { useState } from "react";
import { ChatMessage } from "./message/ChatMessage";

export type Message = {
  sender: "user" | "bot";
  text: string;
  translation: string;
  audioUrl: "#";
};

export const DialogueDisplay = () => {
  const messages: Message[] = [
    {
      sender: "user",
      text: "Salut! Comment vas-tu aujourd'hui?",
      translation: "Hello! How are you today?",
      audioUrl: "#",
    },
    {
      sender: "bot",
      text: "Je vais très bien, merci! Et toi, comment ça va? As-tu fait quelque chose d'intéressant aujourd'hui?",
      translation:
        "I'm doing very well, thank you! And you, how are you? Have you done anything interesting today?",
      audioUrl: "#",
    },
    {
      sender: "bot",
      text: "Je vais très bien, merci! Et toi, comment ça va? As-tu fait quelque chose d'intéressant aujourd'hui?",
      translation:
        "I'm doing very well, thank you! And you, how are you? Have you done anything interesting today?",
      audioUrl: "#",
    },
    {
      sender: "bot",
      text: "Je vais très bien, merci! Et toi, comment ça va? As-tu fait quelque chose d'intéressant aujourd'hui?",
      translation:
        "I'm doing very well, thank you! And you, how are you? Have you done anything interesting today?",
      audioUrl: "#",
    },
    {
      sender: "user",
      text: "Oui, j'ai visité le musée avec mes amis ce matin. C'était vraiment fascinant!",
      translation:
        "Yes, I visited the museum with my friends this morning. It was really fascinating!",
      audioUrl: "#",
    },
  ];
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
    <div className="overflow-y-scroll p-2 max-h-72 flex flex-col w-full mx-auto bg-gray-50 rounded-lg overflow-hidden">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message}
          index={index}
          isPlayingAudio={playingAudio === index}
          isTranslationExpanded={expandedTranslations[index]}
          onToggleAudio={toggleAudio}
          onToggleTranslation={toggleTranslation}
        />
      ))}
    </div>
  );
};

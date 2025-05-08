import { useState } from "react";
import { Play, Pause, ChevronDown, ChevronUp, Globe } from "lucide-react";

export function Chat() {
  // Sample conversation data
  const [messages, setMessages] = useState([
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
  ]);

  // Track which messages have expanded translations
  const [expandedTranslations, setExpandedTranslations] = useState({});

  // Toggle translation visibility
  const toggleTranslation = (index) => {
    setExpandedTranslations((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Audio playback state
  const [playingAudio, setPlayingAudio] = useState(null);

  // Simulate audio playback
  const toggleAudio = (index) => {
    if (playingAudio === index) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(index);
    }
  };

  return (
    <div className=" flex flex-col max-w-[960px] flex-1">
      <div className="overflow-y-scroll p-2 max-h-72 flex flex-col w-full mx-auto bg-gray-50 rounded-lg overflow-hidden">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-xs md:max-w-md ${
                message.sender === "user"
                  ? "bg-blue-100 rounded-tl-xl rounded-bl-xl rounded-tr-xl"
                  : "bg-white border border-gray-300 rounded-tr-xl rounded-br-xl rounded-tl-xl"
              } shadow-sm`}
            >
              {/* Message bubble */}
              <div className="p-3 text-sm">
                <div className="flex justify-between items-start">
                  <p className="text-gray-800">{message.text}</p>

                  {/* Audio button */}
                  <button
                    onClick={() => toggleAudio(index)}
                    className="ml-2 p-1 text-gray-500 hover:text-blue-500 rounded-full"
                  >
                    {playingAudio === index ? (
                      <Pause size={16} />
                    ) : (
                      <Play size={16} />
                    )}
                  </button>
                </div>

                {/* Translation toggle and sender info */}
                <div className="mt-2 pt-2 border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    {/* Translation button - stays on the left */}
                    <button
                      onClick={() => toggleTranslation(index)}
                      className="flex items-center text-xs text-gray-500 hover:text-gray-700"
                    >
                      <Globe size={14} className="mr-1" />
                      {expandedTranslations[index]
                        ? "Hide translation"
                        : "Show translation"}
                      {expandedTranslations[index] ? (
                        <ChevronUp size={14} className="ml-1" />
                      ) : (
                        <ChevronDown size={14} className="ml-1" />
                      )}
                    </button>

                    {/* Sender indicator - always on the right */}
                    <span className="text-xs font-medium text-gray-500">
                      {message.sender === "user" ? "You" : "Bot"}
                    </span>
                  </div>

                  {/* Translation content - appears below when expanded */}
                  {expandedTranslations[index] && (
                    <p className="mt-2 text-xs text-gray-600 italic">
                      {message.translation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

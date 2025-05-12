import {
  Clock,
  Zap,
  Database,
  Speaker,
  FileText,
  ChevronsUp,
  ChevronsDown,
} from "lucide-react";
import { useState } from "react";

const ProcessingTimesVisualizer = ({
  STTduration,
  LLMduration,
  TTSduration,
  saveUserJsonFileDuration,
  saveAssistantJsonFileDuration,
  saveUserAudioFileDuration,
  saveAssistantAudioFileDuration,
}: {
  STTduration?: number;
  LLMduration?: number;
  TTSduration?: number;
  saveUserJsonFileDuration?: number;
  saveAssistantJsonFileDuration?: number;
  saveUserAudioFileDuration?: number;
  saveAssistantAudioFileDuration?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Determine color and intensity based on duration
  const getDurationClass = (duration?: number) => {
    if (!duration) return "bg-gray-300 scale-[0.7]";

    if (duration < 500) return "bg-green-400 scale-[0.6]";
    if (duration < 2000) return "bg-green-500 scale-[0.8]";
    if (duration < 5000) return "bg-yellow-500 scale-100";
    if (duration < 10000) return "bg-orange-500 scale-110";
    return "bg-red-500 scale-125";
  };

  // Icons mapping for different processing stages
  const processIcons = [
    {
      icon: Zap,
      duration: STTduration,
      label: "Speech to Text",
    },
    {
      icon: Clock,
      duration: LLMduration,
      label: "Language Model",
    },
    {
      icon: Speaker,
      duration: TTSduration,
      label: "Text to Speech",
    },
    {
      icon: FileText,
      duration: saveUserJsonFileDuration,
      label: "Save User JSON",
    },
    {
      icon: FileText,
      duration: saveAssistantJsonFileDuration,
      label: "Save Assistant JSON",
    },
    {
      icon: Database,
      duration: saveUserAudioFileDuration,
      label: "Save User Audio",
    },
    {
      icon: Database,
      duration: saveAssistantAudioFileDuration,
      label: "Save Assistant Audio",
    },
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full mx-auto mt-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-fit flex items-center justify-center bg-gray-100 rounded-lg focus:outline-none"
      >
        <span className="text-xl font-bold text-center mb-4 text-gray-800 flex items-center">
          Performance Breakdown
          {isOpen ? <ChevronsUp size={20} /> : <ChevronsDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="grid grid-cols-3 gap-4">
          {processIcons.map(({ icon: Icon, duration, label }, index) => (
            <div
              key={index}
              className="flex flex-col items-center transform transition-all duration-300 ease-in-out"
            >
              <div
                className={`
                p-3 rounded-full mb-2 flex items-center justify-center 
                transition-all duration-300 
                ${getDurationClass(duration)}
              `}
              >
                <Icon className="text-white" size={24} />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <p className="text-xs text-gray-500">
                  {duration !== undefined ? `${duration} ms` : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {isOpen && (
        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Color intensity reflects processing time</p>
          <p>Green: Fast | Yellow: Normal | Red: Slow</p>
        </div>
      )}
    </div>
  );
};

export default ProcessingTimesVisualizer;

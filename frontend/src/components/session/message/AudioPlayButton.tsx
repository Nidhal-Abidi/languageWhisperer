import { Pause, Play } from "lucide-react";

export const AudioPlayButton = ({
  isPlayingAudio,
  onToggle,
}: {
  isPlayingAudio: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      onClick={onToggle}
      className="ml-2 p-1 text-gray-500 hover:text-blue-500 rounded-full cursor-pointer"
    >
      {isPlayingAudio ? <Pause size={16} /> : <Play size={16} />}
    </button>
  );
};

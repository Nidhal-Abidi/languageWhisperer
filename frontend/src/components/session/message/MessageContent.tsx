import { AudioPlayButton } from "./AudioPlayButton";

// Message content in the conversation language
export const MessageContent = ({
  text,
  index,
  isPlayingAudio,
  onToggleAudio,
}: {
  text: string;
  index: number;
  isPlayingAudio: boolean;
  onToggleAudio: (index: number) => void;
}) => {
  return (
    <div className="flex justify-between items-start">
      <p className="text-gray-800">{text}</p>
      <AudioPlayButton
        isPlayingAudio={isPlayingAudio}
        onToggle={() => onToggleAudio(index)}
      />
    </div>
  );
};

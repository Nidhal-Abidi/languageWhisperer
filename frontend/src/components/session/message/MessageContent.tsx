import { AudioPlayButton } from "./AudioPlayButton";

// Message content in the conversation language
export const MessageContent = ({
  text,
  audioUrl,
}: {
  text: string;
  audioUrl: string;
}) => {
  return (
    <div className="flex justify-between items-start">
      <p className="text-gray-800">{text}</p>
      <AudioPlayButton audioUrl={audioUrl} />
    </div>
  );
};

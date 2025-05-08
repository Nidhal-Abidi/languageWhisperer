import { Message } from "../DialogueDisplay";
import { MessageBubble } from "./MessageBubble";
import { MessageContainer } from "./MessageContainer";
import { MessageContent } from "./MessageContent";
import { MessageFooter } from "./MessageFooter";
import { TranslationText } from "./TranslationText";
import { TranslationToggle } from "./TranslationToggle";

export const ChatMessage = ({
  message,
  index,
  isPlayingAudio,
  isTranslationExpanded,
  onToggleAudio,
  onToggleTranslation,
}: {
  message: Message;
  index: number;
  isPlayingAudio: boolean;
  isTranslationExpanded: boolean;
  onToggleAudio: (index: number) => void;
  onToggleTranslation: (index: number) => void;
}) => {
  return (
    <MessageContainer sender={message.sender}>
      <MessageBubble sender={message.sender}>
        <div className="p-3 text-sm">
          <MessageContent
            text={message.text}
            index={index}
            isPlayingAudio={isPlayingAudio}
            onToggleAudio={onToggleAudio}
          />

          <MessageFooter sender={message.sender}>
            <TranslationToggle
              isExpanded={isTranslationExpanded}
              onToggle={() => onToggleTranslation(index)}
            />
          </MessageFooter>

          {isTranslationExpanded && (
            <TranslationText text={message.translation} />
          )}
        </div>
      </MessageBubble>
    </MessageContainer>
  );
};

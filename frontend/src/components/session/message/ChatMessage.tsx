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
  isTranslationExpanded,
  onToggleTranslation,
}: {
  message: Message;
  index: number;
  isTranslationExpanded: boolean;
  onToggleTranslation: (index: number) => void;
}) => {
  return (
    <MessageContainer sender={message.sender}>
      <MessageBubble sender={message.sender}>
        <div className="p-3 text-sm">
          <MessageContent text={message.text} audioUrl={message.audioUrl} />
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

import { ChatLayout } from "./ChatLayout";
import { RecordingButton } from "./RecordingButton";

export const ConversationPractice = () => {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h1 className="text-[#111418] tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">
          Conversation Practice
        </h1>
        <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
          Tap to start and record your audio. The conversation history is
          available in audio, original and translation texts.
        </p>
        <div className="flex items-center justify-center">
          <RecordingButton />
        </div>

        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Conversation History
        </h2>
        <ChatLayout />
      </div>
    </div>
  );
};

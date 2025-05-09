export const ConversationInstructions = ({
  scenario,
}: {
  scenario: string;
}) => {
  return (
    <>
      <h1 className="text-[#111418] tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">
        Conversation Scenario
      </h1>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r">
        <p className="text-xl text-gray-700 leading-relaxed">{scenario}</p>
      </div>

      <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
        Tap to start and record your audio. The conversation history is
        available in audio, original and translation texts.
      </p>
    </>
  );
};

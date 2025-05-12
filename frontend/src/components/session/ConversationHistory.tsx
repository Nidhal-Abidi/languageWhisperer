import { Interaction } from "../../utils/constants";
import { DialogueDisplay } from "./DialogueDisplay";

export const ConversationHistory = (currentInteraction: Interaction) => {
  return (
    <>
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Conversation History
      </h2>
      <DialogueDisplay {...currentInteraction} />
    </>
  );
};

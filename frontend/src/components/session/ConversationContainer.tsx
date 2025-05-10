import { useState } from "react";
import { ConversationHistory } from "./ConversationHistory";
import { ConversationInstructions } from "./ConversationInstructions";
import { RestartConversation } from "./RestartConversation";
import { VoiceInputButton } from "./VoiceInputButton";
import { BACKEND_URL } from "../../utils/config";

export const ConversationContainer = ({
  scenario,
  sessionId,
}: {
  scenario: string;
  sessionId: string;
}) => {
  const [interactionData, setInteractionData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("userRecording", audioBlob, "recording.webm");

      const response = await fetch(
        `${BACKEND_URL}/api/sessions/${sessionId}/interactions`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Request Successful! Data received from backend -->>", data);
      setInteractionData(data);
    } catch (e) {
      console.error("Error: ", e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <ConversationInstructions scenario={scenario} />
        <VoiceInputButton
          isProcessing={isProcessing}
          onRecordingComplete={handleRecordingComplete}
        />
        <ConversationHistory />
        <RestartConversation />
      </div>
    </div>
  );
};

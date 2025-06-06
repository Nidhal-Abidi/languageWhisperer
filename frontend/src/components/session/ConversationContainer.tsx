import { useEffect, useRef, useState } from "react";
import { ConversationHistory } from "./ConversationHistory";
import { ConversationInstructions } from "./ConversationInstructions";
import { RestartConversation } from "./RestartConversation";
import { VoiceInputButton } from "./VoiceInputButton";
import { BACKEND_URL } from "../../utils/config";
import ProcessingTimesVisualizer from "./ProcessingTimesVisualizer";
import axios from "axios";

type interactionData = {
  message: string;
  processingTimes: {
    STTduration: number;
    LLMduration: number;
    TTSduration: number;
    saveUserJsonFileDuration: number;
    saveAssistantJsonFileDuration: number;
    saveUserAudioFileDuration: number;
    saveAssistantAudioFileDuration: number;
  };
  currentInteraction: {
    userOriginal: string;
    userTranslation: string;
    assistantOriginal: string;
    assistantTranslation: string;
    userAudioUrl: string;
    assistantAudioUrl: string;
  };
};

export const ConversationContainer = ({
  scenario,
  sessionId,
}: {
  scenario: string;
  sessionId: string;
}) => {
  const [interactionData, setInteractionData] =
    useState<interactionData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cancel all requests when the component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsProcessing(true);

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const formData = new FormData();
      formData.append("userRecording", audioBlob, "recording.webm");

      const { data } = await axios.post(
        `${BACKEND_URL}/api/sessions/${sessionId}/interactions`,
        formData,
        {
          signal: abortControllerRef.current.signal,
        }
      );

      setInteractionData(data);
    } catch (e: Error) {
      if (e.name !== "CanceledError") {
        console.error("Error: ", e);
      }
    } finally {
      setIsProcessing(false);
      abortControllerRef.current = null;
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
        <ProcessingTimesVisualizer {...interactionData?.processingTimes} />
        <ConversationHistory {...interactionData?.currentInteraction} />
        <RestartConversation />
      </div>
    </div>
  );
};

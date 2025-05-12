// components/VoiceInputButton.tsx
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faSpinner,
  faStop,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";

export const VoiceInputButton = ({
  isProcessing,
  onRecordingComplete,
}: {
  isProcessing: boolean;
  onRecordingComplete: (audioBlob: Blob) => Promise<void>;
}) => {
  const {
    isRecording,
    recordingTime,
    error: recorderError,
    startRecording,
    stopRecording,
    clearError: clearRecorderError,
  } = useVoiceRecorder({
    onRecordingComplete,
  });

  const [error, setError] = useState<string | null>(null);

  // Combine errors from the recorder and any local component errors
  useEffect(() => {
    if (recorderError) {
      setError(recorderError);
    }
  }, [recorderError]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
        clearRecorderError();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [error, clearRecorderError]);

  // Handle button click - toggle recording state
  const handleClick = () => {
    // Don't allow interaction while processing
    if (isProcessing) return;

    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  // Format seconds to display as "XXs"
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Recording Button */}
      <div
        className={`flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl ring ring-gray-100 transition duration-500 ${
          isProcessing ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
        style={
          isRecording
            ? {
                backgroundColor: "#1980e6",
                animation: "bounce-custom 1.5s ease-in-out infinite 0.25s",
              }
            : {}
        }
        onClick={isProcessing ? undefined : handleClick}
      >
        {isProcessing ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-[23px] text-blue-600 animate-spin"
          />
        ) : isRecording ? (
          <FontAwesomeIcon
            icon={faStop}
            className="text-[23px] text-gray-100"
          />
        ) : (
          <FontAwesomeIcon
            icon={faMicrophone}
            className="text-[23px] text-blue-600"
          />
        )}
      </div>

      {/* Status Indicators */}
      <div className="mt-3 text-center">
        {isProcessing && (
          <div className="text-blue-600 font-medium">
            Processing your response (It may take a while)...
          </div>
        )}
        {isRecording && (
          <div className="flex items-center text-red-500 font-medium">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Recording ({formatTime(recordingTime)})
          </div>
        )}
        {!isRecording && !isProcessing && (
          <div className="text-gray-500">
            Press to start recording (Shorter recordings are processed faster)
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 flex items-center text-red-500 font-medium bg-red-50 p-2 rounded-md">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          {error}
        </div>
      )}
    </div>
  );
};

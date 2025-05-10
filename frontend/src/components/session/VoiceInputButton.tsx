import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faSpinner } from "@fortawesome/free-solid-svg-icons";

export const VoiceInputButton = ({
  isProcessing,
  onRecordingComplete,
}: {
  isProcessing: boolean;
  onRecordingComplete: (audioBlob: Blob) => Promise<void>;
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (mediaRecorder.current) {
        mediaRecorder.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const handleRecordingStop = async () => {
    const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
    await onRecordingComplete(audioBlob);
    audioChunks.current = [];
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = handleRecordingStop;
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const handleClick = () => {
    if (isProcessing) return;
    if (!isRecording) {
      startRecording();
    } else {
      mediaRecorder.current?.stop();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`relative flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl ring ring-gray-100 transition duration-500 ${
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
        style={
          isRecording
            ? {
                backgroundColor: "#1980e6",
                animation: "bounce-custom 1.5s ease-in-out infinite 0.25s",
              }
            : {}
        }
        onClick={handleClick}
      >
        {isDisabled ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-[23px] text-blue-600 animate-spin"
          />
        ) : (
          <FontAwesomeIcon
            icon={faMicrophone}
            className={`text-[23px] transition duration-500 ${
              isRecording ? "text-gray-100" : "text-blue-600"
            }`}
          />
        )}
      </div>
    </div>
  );
};

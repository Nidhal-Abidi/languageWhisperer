import { useState, useRef, useEffect } from "react";

export const useVoiceRecorder = ({
  onRecordingComplete,
}: {
  onRecordingComplete: (audioBlob: Blob) => Promise<void>;
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  // Clean up function for media tracks and timers
  const cleanup = () => {
    if (mediaRecorder.current?.state !== "inactive") {
      mediaRecorder.current?.stream
        .getTracks()
        .forEach((track) => track.stop());
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return cleanup;
  }, []);

  // Recording timer effect
  useEffect(() => {
    if (isRecording) {
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const finalizeRecording = async () => {
    try {
      if (audioChunks.current.length === 0) {
        setError("No audio data recorded");
        return;
      }

      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      await onRecordingComplete(audioBlob);
      audioChunks.current = [];
    } catch (error) {
      console.error("Error processing recording:", error);
      setError("Failed to process your recording. Please try again.");
    }
  };

  const startRecording = async () => {
    cleanup();

    try {
      setError(null);
      audioChunks.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };

      // Updated onstop handler to stop tracks and finalize
      mediaRecorder.current.onstop = () => {
        // Stop all tracks in the stream
        stream.getTracks().forEach((track) => track.stop());
        finalizeRecording();
      };

      mediaRecorder.current.start(100);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Could not access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop(); // Only stop the mediaRecorder, tracks are stopped in onstop
    }
    setIsRecording(false);
  };

  const clearError = () => setError(null);

  return {
    isRecording,
    recordingTime,
    error,
    startRecording,
    stopRecording,
    clearError,
  };
};

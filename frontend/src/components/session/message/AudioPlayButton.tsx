import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

export const AudioPlayButton = ({ audioUrl }: { audioUrl: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  return (
    <div>
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
      />
      <button
        onClick={togglePlayback}
        className="ml-2 p-1 text-gray-500 hover:text-blue-500 rounded-full cursor-pointer"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </div>
  );
};

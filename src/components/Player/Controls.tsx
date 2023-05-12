import { ActionIcon } from "@mantine/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface ControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  duration: number;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
}

export default function Controls({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
}: ControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimationRef = useRef<number>(0);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const repeat = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current) return;

    const currentTime = Math.round(audioRef.current.currentTime);
    setTimeProgress(currentTime);
    progressBarRef.current.value = String(currentTime);

    playAnimationRef.current = requestAnimationFrame(repeat);

    if (currentTime === duration) {
      setIsPlaying(false);
      setTimeProgress(0);
      progressBarRef.current.value = "0";
      audioRef.current.currentTime = 0;
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      void audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      void audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, audioRef, repeat]);

  return (
    <div>
      <ActionIcon onClick={togglePlayPause}>
        {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
      </ActionIcon>
    </div>
  );
}

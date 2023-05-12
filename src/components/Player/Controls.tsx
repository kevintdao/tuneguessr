import { ActionIcon } from "@mantine/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface ControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
}

export default function Controls({
  audioRef,
  progressBarRef,
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
  }, [audioRef, progressBarRef, setTimeProgress]);

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

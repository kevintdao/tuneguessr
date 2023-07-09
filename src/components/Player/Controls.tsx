import { ActionIcon } from "@mantine/core";
import React, { useCallback, useEffect, useRef } from "react";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

import { usePlayer } from "~/contexts/PlayerContext";

interface ControlsProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  duration: number;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
  genre: Genre;
}

export default function Controls({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  genre,
}: ControlsProps) {
  const { isPlaying, setIsPlaying } = usePlayer();

  const playAnimationRef = useRef<number>(0);

  const togglePlayPause = () => {
    setIsPlaying((prev) => ({ state: !prev.state, value: genre }));
  };

  const repeat = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current) return;

    const currentTime = Math.round(audioRef.current.currentTime);
    setTimeProgress(currentTime);
    progressBarRef.current.value = String(currentTime);

    playAnimationRef.current = requestAnimationFrame(repeat);

    if (currentTime === duration) {
      setIsPlaying({ state: false });
      setTimeProgress(0);
      progressBarRef.current.value = "0";
      audioRef.current.currentTime = 0;
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress, setIsPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying.state && isPlaying.value === genre) {
      void audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      void audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, audioRef, repeat, genre]);

  return (
    <div>
      <ActionIcon onClick={togglePlayPause}>
        {isPlaying.state ? <IoPauseSharp /> : <IoPlaySharp />}
      </ActionIcon>
    </div>
  );
}

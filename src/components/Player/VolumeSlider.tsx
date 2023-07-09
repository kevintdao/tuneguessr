import { ActionIcon, Box, Slider } from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeMute,
} from "react-icons/io5";

import { usePlayer } from "~/contexts/PlayerContext";

interface VolumeProps {
  volume: number;
  isMuted: boolean;
  size: number;
}

interface VolumeSliderProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

function VolumeIcon({ volume, isMuted, size }: VolumeProps) {
  if (isMuted || volume === 0) {
    return <IoVolumeMute size={size} color={isMuted ? "red" : "default"} />;
  }
  if (volume > 0 && volume <= 33) {
    return <IoVolumeLow size={size} />;
  }
  if (volume > 33 && volume <= 67) {
    return <IoVolumeMedium size={size} />;
  }
  if (volume > 67 && volume <= 100) {
    return <IoVolumeHigh size={size} />;
  }
  return null;
}

export default function VolumeSlider({ audioRef }: VolumeSliderProps) {
  const { volume, setVolume } = usePlayer();

  const [muteVolume, setMuteVolume] = useState(false);

  const handleMute = () => {
    setMuteVolume((prev) => !prev);
  };

  const handleVolume = (value: number) => {
    setVolume(value);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <ActionIcon onClick={handleMute}>
        <VolumeIcon volume={volume} isMuted={muteVolume} size={20} />
      </ActionIcon>
      <Slider
        value={muteVolume ? 0 : volume}
        onChange={handleVolume}
        sx={{ width: "100px" }}
      />
    </Box>
  );
}

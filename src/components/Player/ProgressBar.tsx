import { Grid, Slider, Text } from "@mantine/core";
import React from "react";

interface ProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  timeProgress: number;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
}

function formatDuration(duration: number): string {
  if (duration < 10) {
    return `0${duration}`;
  }
  return `${duration}`;
}

export default function ProgressBar({
  audioRef,
  progressBarRef,
  timeProgress,
  setTimeProgress,
  duration,
}: ProgressBarProps) {
  const handleSeekChange = (value: number) => {
    if (!audioRef.current || !progressBarRef.current) return;

    setTimeProgress(value);
    audioRef.current.currentTime = value;
  };

  return (
    <Grid align="center" justify="center">
      <Grid.Col
        span={10}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text>0:{formatDuration(timeProgress)}</Text>
        <Slider
          showLabelOnHover={false}
          ref={progressBarRef}
          value={timeProgress}
          onChange={handleSeekChange}
          min={0}
          max={duration}
          step={1}
          sx={{ flex: 1 }}
        />
        <Text>0:{formatDuration(duration)}</Text>
      </Grid.Col>
    </Grid>
  );
}

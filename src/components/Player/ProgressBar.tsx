import { Grid, Slider, Text } from "@mantine/core";
import React from "react";

interface ProgressBarProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  progressBarRef: React.RefObject<HTMLInputElement>;
  timeProgress: number;
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
  duration,
}: ProgressBarProps) {
  const handleProgressChange = () => {
    if (!audioRef.current || !progressBarRef.current) return;

    audioRef.current.currentTime = Math.round(
      parseInt(progressBarRef.current.value)
    );
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
          onChange={handleProgressChange}
          min={0}
          max={duration}
          sx={{ flex: 1 }}
        />
        <Text>0:{formatDuration(duration)}</Text>
      </Grid.Col>
    </Grid>
  );
}

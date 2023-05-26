import { Grid, Paper, Stack } from "@mantine/core";
import { useRef, useState } from "react";

import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import VolumeSlider from "./VolumeSlider";

interface PlayerProps {
  url: string;
  controls?: boolean;
}

export default function Player({ url }: PlayerProps) {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const onLoadedMetadata = () => {
    if (!audioRef.current || !progressBarRef.current) return;

    const seconds = Math.round(audioRef.current.duration);
    setDuration(seconds);
    progressBarRef.current.max = String(seconds);
  };

  const handleProgressChange = () => {
    if (!audioRef.current || !progressBarRef.current) return;

    audioRef.current.currentTime = timeProgress;
  };

  return (
    <Paper p="xs" withBorder>
      <Stack>
        <Grid align="center" justify="center">
          <Grid.Col
            span={10}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <audio
              src={url}
              ref={audioRef}
              onLoadedMetadata={onLoadedMetadata}
              onProgress={handleProgressChange}
            />
            <Controls
              {...{ audioRef, duration, progressBarRef, setTimeProgress }}
            />
            <VolumeSlider {...{ audioRef }} />
          </Grid.Col>
        </Grid>
        <ProgressBar
          {...{
            progressBarRef,
            audioRef,
            timeProgress,
            setTimeProgress,
            duration,
          }}
        />
      </Stack>
    </Paper>
  );
}

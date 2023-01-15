import { ActionIcon, Box, Grid, Paper, Slider, Stack, Text } from '@mantine/core';
import { useRef, useState } from 'react';
import { IoVolumeHigh, IoVolumeLow, IoVolumeMedium, IoVolumeMute } from 'react-icons/io5';
import { MdPause as PauseIcon, MdPlayArrow as PlayIcon } from 'react-icons/md';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';

interface Props {
  player: {
    url: string;
    controls?: boolean;
  };
}

interface VolumeProps {
  volume: number;
  isMuted: boolean;
  size: number;
}

function formatDuration(duration: number): string {
  if (duration < 10) {
    return `0${duration}`;
  }
  return `${duration}`;
}

function VolumeIcon({ volume, isMuted, size }: VolumeProps) {
  if (isMuted || volume === 0) {
    return <IoVolumeMute size={size} />;
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

export default function Player({ url, controls }: Props['player']) {
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);

  const audioRef = useRef<ReactPlayer>(null);

  const handlePlay = () => setIsPlaying(!isPlaying);

  const handleDuration = (d: number) => setDuration(Math.round(d));

  const handleVolumeChange = (vol: number) => setVolume(vol);

  const handleMute = () => setIsMuted(!isMuted);

  const handleProgress = (s: OnProgressProps) => {
    if (!seeking) {
      setPlayed(Math.round(s.playedSeconds));
    }
  };

  const handleEnded = () => setIsPlaying(false);

  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekChange = (value: number) => setPlayed(Math.round(value));
  const handleSeekMouseUp = () => {
    if (audioRef.current) {
      setSeeking(false);
      audioRef.current.seekTo(played, 'seconds');
    }
  };

  return (
    <>
      <ReactPlayer
        ref={audioRef}
        url={url}
        playing={isPlaying}
        volume={volume / 100}
        muted={isMuted}
        onDuration={handleDuration}
        onProgress={handleProgress}
        onEnded={handleEnded}
        width="0%"
        height="0%"
        style={{ display: 'none' }}
      />
      <Paper p="xs" withBorder>
        <Stack>
          <Grid align="center" justify="center">
            <Grid.Col span={10} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ActionIcon onClick={handlePlay}>{isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}</ActionIcon>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ActionIcon onClick={handleMute}>
                  <VolumeIcon volume={volume} isMuted={isMuted} size={20} />
                </ActionIcon>
                <Slider value={isMuted ? 0 : volume} onChange={handleVolumeChange} sx={{ width: '100px' }} />
              </Box>
            </Grid.Col>
          </Grid>

          <Grid align="center" justify="center">
            <Grid.Col span={10} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
              <Text>0:{formatDuration(played)}</Text>
              <Slider
                showLabelOnHover={false}
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                min={0}
                max={duration}
                sx={{ flex: 1 }}
              />
              <Text>0:{formatDuration(duration)}</Text>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </>
  );
}

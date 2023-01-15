import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  MediaQuery,
  ScrollArea,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { differenceInDays, isBefore } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { MdCancel, MdHelp, MdSend } from 'react-icons/md';
import decrypt from '../lib/decrypt';
import { hideAnswer } from '../lib/song';
import HowToPlayModal from './Modal/HowToPlayModal';
import Player from './Player/Player';
import SongDetail from './Song/SongDetail';
import Streak from './Streak';

interface Props {
  content: string;
  dailyGame: DGame;
  setDailyGame: (val: DGame | ((prevState: DGame) => DGame)) => void;
}

const CURR_DATE = new Date().toISOString().slice(0, 10);
const NEXT_DATE = new Date(CURR_DATE);
NEXT_DATE.setDate(NEXT_DATE.getDate() + 1);

export default function DailySong({ content, dailyGame, setDailyGame }: Props) {
  const song = decrypt(content);

  const [value, setValue] = useState('');
  const [helpOpened, setHelpOpened] = useState(false);

  const handleGuess = () => {
    // check guess
    if (song.answer.toLowerCase() === value.toLowerCase().trim()) {
      setDailyGame((prevState) => ({ ...prevState, correct: true, streak: prevState.streak + 1 }));
    }

    setDailyGame((prevState) => ({ ...prevState, guesses: [value, ...prevState.guesses] }));
    setValue('');
  };

  const handleGuessMouseDown = (e: React.KeyboardEvent) => {
    if (value !== '' && e.key === 'Enter') {
      handleGuess();
    }
  };

  const handleGuessClick = (e: React.MouseEvent) => {
    if (value !== '' && e.type === 'click') {
      handleGuess();
    }
  };

  const handleGiveUp = () => setDailyGame((prevState) => ({ ...prevState, giveUp: true, streak: 0 }));

  useEffect(() => {
    const currentDate = new Date(CURR_DATE);
    const gameDate = new Date(dailyGame.date);

    if (isBefore(gameDate, currentDate)) {
      setDailyGame((prevState) => ({
        ...prevState,
        correct: false,
        gaveUp: false,
        guesses: [],
        streak: differenceInDays(currentDate, gameDate) > 1 ? 0 : prevState.streak,
        date: new Date().toISOString().slice(0, 10),
      }));
    }
  }, [dailyGame.date, setDailyGame]);

  return (
    <Container size="sm" p={0}>
      <Card withBorder>
        <Stack>
          <Grid>
            <Grid.Col span={2}>
              <Streak streak={dailyGame.streak} />
            </Grid.Col>
            <Grid.Col span="auto">
              <Title order={3} align="center">
                Daily Song
              </Title>
            </Grid.Col>
            <Grid.Col span={2}>
              <Flex justify="flex-end">
                <Tooltip label="How to Play" withArrow onClick={() => setHelpOpened(true)}>
                  <ActionIcon>
                    <MdHelp size={20} />
                  </ActionIcon>
                </Tooltip>
              </Flex>
            </Grid.Col>
          </Grid>

          <Center sx={{ gap: 8 }}>
            <Text>Next song in: </Text>
            <Countdown date={NEXT_DATE} daysInHours onComplete={() => window.location.reload()} />
          </Center>

          {dailyGame.correct || dailyGame.giveUp ? (
            <>
              <Text align="center">
                Answer: <strong>{song.answer}</strong>
              </Text>

              <Player url={song.url} />

              <SongDetail song={song} />
            </>
          ) : (
            <>
              <Text align="center">
                Answer: <strong>{hideAnswer(song.answer)}</strong>
              </Text>
              <Player url={song.url} />

              <Flex gap={8} align="center">
                <TextInput
                  placeholder="Answer"
                  sx={{ flex: 1 }}
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onKeyDown={handleGuessMouseDown}
                />

                {/* mobile buttons */}
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Tooltip label="Guess" withArrow>
                    <ActionIcon onClick={handleGuessClick} color="blue">
                      <MdSend size={20} />
                    </ActionIcon>
                  </Tooltip>
                </MediaQuery>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Tooltip label="Give Up" withArrow>
                    <ActionIcon onClick={handleGiveUp} color="red">
                      <MdCancel size={20} />
                    </ActionIcon>
                  </Tooltip>
                </MediaQuery>

                {/* buttons */}
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                  <Button onClick={handleGuessClick} leftIcon={<MdSend size={20} />}>
                    Guess
                  </Button>
                </MediaQuery>
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                  <Button color="red" onClick={handleGiveUp} leftIcon={<MdCancel size={20} />}>
                    Give Up
                  </Button>
                </MediaQuery>
              </Flex>
            </>
          )}
        </Stack>
      </Card>

      <Space h="sm" />

      <Card withBorder>
        <Stack>
          <Title order={3} align="center">
            Guesses
          </Title>

          <ScrollArea sx={{ height: 200 }} type="always" offsetScrollbars>
            <Stack>
              {dailyGame.guesses.map((guess, i) => (
                <Box key={`guess-${i}`} sx={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Text>{dailyGame.guesses.length - i}:</Text>
                  <Card withBorder p="xs" sx={{ flex: 1 }}>
                    {guess}
                  </Card>
                </Box>
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Card>

      {/* how to play modal */}
      <HowToPlayModal opened={helpOpened} setOpened={setHelpOpened} />
    </Container>
  );
}

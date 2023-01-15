import { Box, Button, Card, Container, ScrollArea, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import React, { useState } from 'react';
import { MdCancel, MdSend } from 'react-icons/md';
import decrypt from '../lib/decrypt';
import { hideAnswer } from '../lib/song';
import Player from './Player/Player';
import SongDetail from './Song/SongDetail';

type Props = {
  content: string;
};

type Game = {
  correct: boolean;
  giveUp: boolean;
  streak: number;
  guesses: string[];
  date: string;
};

const CURR_DATE = new Date().toISOString().slice(0, 10);
const NEXT_DATE = new Date(CURR_DATE);
NEXT_DATE.setDate(NEXT_DATE.getDate() + 1);

export default function DailySong({ content }: Props) {
  const song = decrypt(content);
  const [dailyGame, setDailyGame] = useLocalStorage({
    key: 'daily-song',
    defaultValue: {
      correct: false,
      giveUp: false,
      streak: 0,
      guesses: [],
      date: new Date().toISOString().slice(0, 10),
    } as Game,
    getInitialValueInEffect: true,
  });

  const [value, setValue] = useState('');

  const handleGuess = () => {
    // check guess
    if (song.answer.toLowerCase() === value.toLowerCase()) {
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

  return (
    <Container size="sm">
      <Card withBorder>
        <Stack>
          <Title order={3} align="center">
            Daily Song
          </Title>

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

              <Box sx={{ display: 'flex', gap: 8 }}>
                <TextInput
                  placeholder="Answer"
                  sx={{ flex: 1 }}
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onKeyDown={handleGuessMouseDown}
                />
                <Button onClick={handleGuessClick} leftIcon={<MdSend />}>
                  Guess
                </Button>
                <Button color="red" onClick={handleGiveUp} leftIcon={<MdCancel />}>
                  Give Up
                </Button>
              </Box>
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
          <ScrollArea sx={{ height: 250 }} type="always" offsetScrollbars>
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
    </Container>
  );
}

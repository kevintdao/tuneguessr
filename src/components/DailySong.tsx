import { Card, Center, Space, Stack, Text } from "@mantine/core";
import { differenceInDays, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

import AnswerInput from "~/components/Game/AnswerInput";
import Guesses from "~/components/Game/Guesses";
import Header from "~/components/Game/Header";
import SongDetails from "~/components/Game/SongDetails";
import Loading from "~/components/Loading";
import HowToPlayModal from "~/components/Modal/HowToPlayModal";
import Player from "~/components/Player/AudioPlayer";
import { CURR_DATE, NEXT_DATE } from "~/pages";

import { api } from "~/utils/api";
import decrypt from "~/utils/encryption";
import { hideAnswer } from "~/utils/song";

interface DailySongProps {
  genre: Genre;
  dailyGame: Game;
  setDailyGame: (
    val: DailyGame | ((prevState: DailyGame) => DailyGame)
  ) => void;
}

export default function DailySong({
  genre,
  dailyGame,
  setDailyGame,
}: DailySongProps) {
  const [answer, setAnswer] = useState("");
  const [helpOpened, setHelpOpened] = useState(false);

  const { data, isLoading } = api.spotify.getDailySong.useQuery({
    genre,
  });

  const handleGuess = () => {
    // check guess
    if (song.answer.toLowerCase() === answer.toLowerCase().trim()) {
      setDailyGame((prevState) => ({
        ...prevState,
        [genre]: {
          ...prevState[genre],
          correct: true,
          streak: prevState[genre].streak + 1,
        },
      }));
    }

    setDailyGame((prevState) => ({
      ...prevState,
      [genre]: {
        ...prevState[genre],
        guesses: [answer, ...prevState[genre].guesses],
      },
    }));
    setAnswer("");
  };

  const handleGiveUp = () =>
    setDailyGame((prevState) => ({
      ...prevState,
      [genre]: { ...prevState[genre], giveUp: true },
    }));

  useEffect(() => {
    const currentDate = new Date(CURR_DATE);
    const gameDate = new Date(dailyGame.date);

    if (isBefore(gameDate, currentDate)) {
      setDailyGame((prevState) => ({
        ...prevState,
        [genre]: {
          ...prevState[genre],
          correct: false,
          giveUp: false,
          guesses: [],
          streak:
            differenceInDays(currentDate, gameDate) > 1
              ? 0
              : prevState[genre].streak,
          date: new Date().toISOString().slice(0, 10),
        },
      }));
    }
  }, [dailyGame.date, genre, setDailyGame]);

  if (!data || isLoading) {
    return <Loading center />;
  }

  const song = decrypt(data.content);
  const gameOver = dailyGame.correct || dailyGame.giveUp;
  return (
    <>
      <Card withBorder>
        <Stack>
          <Stack spacing={6}>
            <Header
              setHelpOpened={setHelpOpened}
              streak={dailyGame.streak}
              genre={genre}
            />

            <Text align="center">
              Answer:{" "}
              <strong>
                {gameOver ? song.answer : hideAnswer(song.answer)}
              </strong>
            </Text>

            <Center sx={{ gap: 4 }}>
              <Text>Next song in: </Text>
              <Countdown
                date={NEXT_DATE}
                daysInHours
                onComplete={() => window.location.reload()}
              />
            </Center>
          </Stack>

          <Player url={song.url} />

          {gameOver ? (
            <SongDetails song={song} />
          ) : (
            <AnswerInput
              answer={answer}
              setAnswer={setAnswer}
              handleGuess={handleGuess}
              handleGiveUp={handleGiveUp}
            />
          )}
        </Stack>
      </Card>

      <Space h="sm" />

      <Guesses
        guesses={dailyGame.guesses}
        correct={dailyGame.correct}
        giveUp={dailyGame.giveUp}
      />

      {/* how to play modal */}
      <HowToPlayModal opened={helpOpened} setOpened={setHelpOpened} />
    </>
  );
}
import { Card, Center, Container, Space, Stack, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { differenceInDays, isBefore } from "date-fns";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

import AnswerInput from "~/components/Game/AnswerInput";
import Guesses from "~/components/Game/Guesses";
import Header from "~/components/Game/Header";
import SongDetails from "~/components/Game/SongDetails";
import Loading from "~/components/Loading";
import HowToPlayModal from "~/components/Modal/HowToPlayModal";
import Player from "~/components/Player/AudioPlayer";

import { api } from "~/utils/api";
import decrypt from "~/utils/encryption";
import { hideAnswer } from "~/utils/song";

const CURR_DATE = new Date().toISOString().slice(0, 10);
const NEXT_DATE = new Date(CURR_DATE);
NEXT_DATE.setDate(NEXT_DATE.getDate() + 1);

const Home: NextPage = () => {
  const [dailyGame, setDailyGame] = useLocalStorage({
    key: "daily-song",
    defaultValue: {
      correct: false,
      giveUp: false,
      streak: 0,
      guesses: [],
      date: new Date().toISOString().slice(0, 10),
    } as Game,
    getInitialValueInEffect: true,
  });

  const [answer, setAnswer] = useState("");
  const [helpOpened, setHelpOpened] = useState(false);

  const { data, isLoading } = api.spotify.getDailySong.useQuery();

  const handleGuess = () => {
    // check guess
    if (song.answer.toLowerCase() === answer.toLowerCase().trim()) {
      setDailyGame((prevState) => ({
        ...prevState,
        correct: true,
        streak: prevState.streak + 1,
      }));
    }

    setDailyGame((prevState) => ({
      ...prevState,
      guesses: [answer, ...prevState.guesses],
    }));
    setAnswer("");
  };

  const handleGiveUp = () =>
    setDailyGame((prevState) => ({ ...prevState, giveUp: true, streak: 0 }));

  useEffect(() => {
    const currentDate = new Date(CURR_DATE);
    const gameDate = new Date(dailyGame.date);

    if (isBefore(gameDate, currentDate)) {
      setDailyGame((prevState) => ({
        ...prevState,
        correct: false,
        giveUp: false,
        guesses: [],
        streak:
          differenceInDays(currentDate, gameDate) > 1 ? 0 : prevState.streak,
        date: new Date().toISOString().slice(0, 10),
      }));
    }
  }, [dailyGame.date, setDailyGame]);

  if (!data || isLoading) {
    return <Loading center />;
  }

  const song = decrypt(data.content);
  const gameOver = dailyGame.correct || dailyGame.giveUp;
  return (
    <Container size="sm" p={0}>
      <Card withBorder>
        <Stack>
          <Stack spacing={6}>
            <Header setHelpOpened={setHelpOpened} streak={dailyGame.streak} />

            {gameOver ? (
              <Center sx={{ gap: 4 }}>
                <Text>Next song in: </Text>
                <Countdown
                  date={NEXT_DATE}
                  daysInHours
                  onComplete={() => window.location.reload()}
                />
              </Center>
            ) : null}

            <Text align="center">
              Answer:{" "}
              <strong>
                {gameOver ? song.answer : hideAnswer(song.answer)}
              </strong>
            </Text>
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
    </Container>
  );
};

export default Home;

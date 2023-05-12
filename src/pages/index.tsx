import {
  ActionIcon,
  Alert,
  Anchor,
  Box,
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  MediaQuery,
  Paper,
  ScrollArea,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { differenceInDays, isBefore } from "date-fns";
import { type NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import {
  MdCancel,
  MdCheckCircle,
  MdHelp,
  MdLocalFireDepartment,
  MdSend,
} from "react-icons/md";
import Loading from "~/components/Loading";
import HowToPlayModal from "~/components/Modal/HowToPlayModal";
import Player from "~/components/Player/AudioPlayer";

import { api } from "~/utils/api";
import decrypt from "~/utils/encryption";
import { hideAnswer } from "~/utils/song";

const CURR_DATE = new Date().toISOString().slice(0, 10);
const NEXT_DATE = new Date(CURR_DATE);
NEXT_DATE.setDate(NEXT_DATE.getDate() + 1);

const Header = ({
  setHelpOpened,
  streak,
}: {
  setHelpOpened: React.Dispatch<React.SetStateAction<boolean>>;
  streak: number;
}) => {
  return (
    <Grid>
      <Grid.Col span={2}>
        <Streak streak={streak} />
      </Grid.Col>
      <Grid.Col span="auto">
        <Title order={3} align="center">
          Daily Song
        </Title>
      </Grid.Col>
      <Grid.Col span={2}>
        <Flex justify="flex-end">
          <Tooltip
            label="How to Play"
            withArrow
            onClick={() => setHelpOpened(true)}
          >
            <ActionIcon>
              <MdHelp size={20} />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Grid.Col>
    </Grid>
  );
};

const AnswerInput = ({
  answer,
  setAnswer,
  handleGuess,
  handleGiveUp,
}: {
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  handleGuess: () => void;
  handleGiveUp: () => void;
}) => {
  const handleGuessMouseDown = (e: React.KeyboardEvent) => {
    if (answer !== "" && e.key === "Enter") {
      handleGuess();
    }
  };

  const handleGuessClick = (e: React.MouseEvent) => {
    if (answer !== "" && e.type === "click") {
      handleGuess();
    }
  };

  return (
    <Flex gap={8} align="center">
      <TextInput
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.currentTarget.value)}
        onKeyDown={handleGuessMouseDown}
        sx={{ flex: 1 }}
      />

      {/* mobile buttons */}
      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
        <Tooltip label="Guess" withArrow>
          <ActionIcon color="blue" onClick={handleGuessClick}>
            <MdSend size={20} />
          </ActionIcon>
        </Tooltip>
      </MediaQuery>
      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
        <Tooltip label="Give Up" withArrow onClick={handleGiveUp}>
          <ActionIcon color="red">
            <MdCancel size={20} />
          </ActionIcon>
        </Tooltip>
      </MediaQuery>

      {/* buttons */}
      <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
        <Button leftIcon={<MdSend size={20} />} onClick={handleGuessClick}>
          Guess
        </Button>
      </MediaQuery>
      <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
        <Button
          color="red"
          leftIcon={<MdCancel size={20} />}
          onClick={handleGiveUp}
        >
          Give Up
        </Button>
      </MediaQuery>
    </Flex>
  );
};

const SongDetails = ({ song }: { song: Song }) => {
  const { songId, name, artists, album } = song;

  return (
    <Paper withBorder p="sm">
      <Group noWrap align="top">
        <Image
          src={album.image.url}
          alt={album.image.url}
          withPlaceholder
          height={140}
          width={140}
          radius="sm"
          className="mt-1"
        />
        <Box>
          <Anchor
            className="text-xl"
            fw={700}
            component={Link}
            href={`https://open.spotify.com/track/${songId}`}
            target="_blank"
          >
            {name}
          </Anchor>
          <Text>{artists.map((item) => item.name).join(", ")}</Text>
          <Text>{album.name}</Text>
        </Box>
      </Group>
    </Paper>
  );
};

const Guesses = ({
  guesses,
  correct,
  giveUp,
}: {
  guesses: string[];
  correct: boolean;
  giveUp: boolean;
}) => {
  return (
    <Card withBorder>
      <Stack>
        <Title order={3} align="center">
          Guesses
        </Title>

        <ScrollArea sx={{ height: 230 }} type="always" offsetScrollbars>
          <Stack>
            {/* correct or give up */}
            {correct && (
              <Alert color="green" p={2}>
                <Center>
                  <Text fw={500} fz="sm" color="green">
                    You got the correct answer!
                  </Text>
                </Center>
              </Alert>
            )}

            {giveUp && (
              <Alert color="red" p={2}>
                <Center>
                  <Center>
                    <Text fw={500} fz="sm" color="red">
                      You gave up!
                    </Text>
                  </Center>
                </Center>
              </Alert>
            )}

            {guesses.map((guess, i) => (
              <Box
                key={`guess-${i}`}
                sx={{ display: "flex", alignItems: "center", gap: 16 }}
              >
                <Text>{guesses.length - i}:</Text>
                <Card
                  withBorder
                  p="xs"
                  sx={{
                    flex: 1,
                    justifyContent: "space-between",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {guess}
                  {correct && i === 0 ? (
                    <MdCheckCircle size={24} color="green" />
                  ) : (
                    <MdCancel size={24} color="red" />
                  )}
                </Card>
              </Box>
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    </Card>
  );
};

const Streak = ({ streak }: { streak: number }) => {
  function StreakIcon({ streak }: { streak: number }) {
    let color;
    if (streak > 0 && streak < 4) color = "#FFA8A8";
    if (streak >= 4 && streak < 8) color = "#FA5252";
    if (streak >= 8) color = "#C92A2A";

    return <MdLocalFireDepartment size={20} color={color} />;
  }

  return (
    <Flex align="center">
      <Tooltip withArrow label="Streak">
        <ActionIcon variant="transparent" disabled sx={{ cursor: "default" }}>
          <StreakIcon streak={streak} />
        </ActionIcon>
      </Tooltip>
      <Text>{streak}</Text>
    </Flex>
  );
};

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
          <Header setHelpOpened={setHelpOpened} streak={dailyGame.streak} />

          {gameOver ? (
            <Center sx={{ gap: 8 }}>
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
            <strong>{gameOver ? song.answer : hideAnswer(song.answer)}</strong>
          </Text>

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

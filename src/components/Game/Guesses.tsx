import {
  Alert,
  Box,
  Card,
  Center,
  Grid,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { MdCancel, MdCheckCircle, MdInfo } from "react-icons/md";

import CustomDivider from "../Divider";

import { MAX_GUESSES } from "~/utils/constant";

interface ResultBannerProps {
  correct: boolean;
  giveUp: boolean;
  isMaxGuesses: boolean;
}

const ResultBanner = ({ correct, giveUp, isMaxGuesses }: ResultBannerProps) => {
  const show = correct || giveUp || isMaxGuesses;

  if (!show) return null;

  const color = correct ? "green" : "red";

  let text = "";
  if (correct) {
    text = "You got the correct answer!";
  } else if (giveUp) {
    text = "You gave up!";
  } else if (isMaxGuesses) {
    text = "You ran out of guesses!";
  }

  return (
    <Alert color={color} p={2}>
      <Center>
        <Text fw={500} fz="sm" color={color}>
          {text}
        </Text>
      </Center>
    </Alert>
  );
};

interface GuessesProps {
  isMaxGuesses: boolean;
  guesses: string[];
  correct: boolean;
  giveUp: boolean;
}

const Guesses = ({ isMaxGuesses, guesses, correct, giveUp }: GuessesProps) => {
  return (
    <Card withBorder sx={{ height: "100%" }}>
      <Stack spacing={6}>
        <Stack spacing={2}>
          <Grid align="center">
            <Grid.Col offset={2} span={8}>
              <Title order={3} align="center">
                Guesses
              </Title>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text
                align="right"
                sx={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <MdInfo color="grey" />
                {MAX_GUESSES - guesses.length}/{MAX_GUESSES}
              </Text>
            </Grid.Col>
          </Grid>
          <CustomDivider />

          {/* correct, give up, or is max guesses */}
          <ResultBanner
            correct={correct}
            giveUp={giveUp}
            isMaxGuesses={isMaxGuesses}
          />
        </Stack>

        <ScrollArea.Autosize
          mah={{
            base: 226,
            md: 396,
          }}
          type="hover"
        >
          <Stack spacing={2}>
            {guesses.map((guess, i) => (
              <Grid
                key={`guess-${i}`}
                align="center"
                sx={{
                  marginRight: 0,
                  marginBottom: 0,
                }}
              >
                <Grid.Col span={1} sx={{ maxWidth: 32 }}>
                  <Text fw={600}>{guesses.length - i}:</Text>
                </Grid.Col>
                <Grid.Col span="auto">
                  <Card
                    withBorder
                    p="xs"
                    sx={{
                      flex: 1,
                      justifyContent: "space-between",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Text c="dimmed" fz="sm" lineClamp={1}>
                      {guess}
                    </Text>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {correct && i === 0 ? (
                        <MdCheckCircle size={24} color="green" />
                      ) : (
                        <MdCancel size={24} color="red" />
                      )}
                    </Box>
                  </Card>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </ScrollArea.Autosize>
      </Stack>
    </Card>
  );
};

export default Guesses;

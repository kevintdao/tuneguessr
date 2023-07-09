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
import { MdCancel, MdCheckCircle } from "react-icons/md";

import CustomDivider from "../Divider";

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
    <Card withBorder sx={{ height: "100%" }}>
      <Stack spacing={6}>
        <Stack spacing={2}>
          <Title order={3} align="center">
            Guesses
          </Title>
          <CustomDivider />
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
                    <Text c="dimmed" fz="sm">
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

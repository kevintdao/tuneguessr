import {
  Alert,
  Card,
  Center,
  Grid,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { MdCancel, MdCheckCircle } from "react-icons/md";

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
      <Stack spacing={6}>
        <Title order={3} align="center">
          Guesses
        </Title>
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

        <ScrollArea h={230} type="hover">
          <Stack>
            {guesses.map((guess, i) => (
              <Grid key={`guess-${i}`} align="center" sx={{ marginRight: 0 }}>
                <Grid.Col span={1}>
                  <Text fw={600}>{guesses.length - i}:</Text>
                </Grid.Col>
                <Grid.Col span={11}>
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
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
    </Card>
  );
};

export default Guesses;
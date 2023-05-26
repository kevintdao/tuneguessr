import { Box, Container, Tabs } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { type NextPage } from "next";
import { MdCancel, MdCheckCircle, MdInfo } from "react-icons/md";

import DailySong from "~/components/DailySong";

export const CURR_DATE = new Date().toISOString().slice(0, 10);
export const NEXT_DATE = new Date(CURR_DATE);
NEXT_DATE.setDate(NEXT_DATE.getDate() + 1);

const initialGame: Game = {
  correct: false,
  giveUp: false,
  streak: 0,
  guesses: [],
  date: new Date().toISOString().slice(0, 10),
};

const game: DailyGame = {
  pop: initialGame,
  kpop: initialGame,
  latin: initialGame,
  dance: initialGame,
  "80s": initialGame,
  "90s": initialGame,
  "2000s": initialGame,
  "2010s": initialGame,
};

const tabs: Tab[] = [
  {
    label: "Pop",
    value: "pop",
  },
  {
    label: "K-Pop",
    value: "kpop",
  },
  {
    label: "Latin",
    value: "latin",
  },
  {
    label: "Dance",
    value: "dance",
  },
  {
    label: "80s",
    value: "80s",
  },
  {
    label: "90s",
    value: "90s",
  },
  {
    label: "2000s",
    value: "2000s",
  },
  {
    label: "2010s",
    value: "2010s",
  },
];

const Home: NextPage = () => {
  const [dailyGame, setDailyGame] = useLocalStorage({
    key: "daily-song",
    defaultValue: game,
    getInitialValueInEffect: true,
  });

  return (
    <Container size="sm" p={0}>
      <Tabs defaultValue="pop" orientation="vertical" variant="outline">
        <Tabs.List>
          {tabs.map((tab) => {
            const game = dailyGame[tab.value];
            const correct = game.correct;
            const giveUp = game.giveUp;

            let icon;
            if (correct) {
              icon = <MdCheckCircle color="green" />;
            } else if (giveUp) {
              icon = <MdCancel color="red" />;
            } else {
              icon = <MdInfo color="grey" />;
            }

            return (
              <Tabs.Tab key={tab.value} value={tab.value}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {icon} {tab.label}
                </Box>
              </Tabs.Tab>
            );
          })}
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Panel
            key={tab.value}
            value={tab.value}
            pl={6}
            sx={{ minWidth: 250 }}
          >
            <DailySong
              label={tab.label}
              genre={tab.value}
              dailyGame={dailyGame[tab.value]}
              setDailyGame={setDailyGame}
            />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  );
};

export default Home;

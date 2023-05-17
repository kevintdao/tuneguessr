import { Container, Tabs } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { type NextPage } from "next";
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
];

const Home: NextPage = () => {
  const [dailyGame, setDailyGame] = useLocalStorage({
    key: "daily-song",
    defaultValue: game,
    getInitialValueInEffect: true,
  });

  return (
    <Container size="sm" p={0}>
      <Tabs defaultValue="pop">
        <Tabs.List position="center">
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value} pt="xs">
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

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
};

const Home: NextPage = () => {
  const [dailyGame, setDailyGame] = useLocalStorage({
    key: "daily-song",
    defaultValue: game,
    getInitialValueInEffect: true,
  });

  return (
    <Container size="sm" p={0}>
      <Tabs defaultValue="pop">
        <Tabs.List>
          <Tabs.Tab value="pop">Pop</Tabs.Tab>
          <Tabs.Tab value="kpop">K-Pop</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="pop" pt="xs">
          <DailySong
            genre="pop"
            dailyGame={dailyGame.pop}
            setDailyGame={setDailyGame}
          />
        </Tabs.Panel>

        <Tabs.Panel value="kpop" pt="xs">
          <DailySong
            genre="kpop"
            dailyGame={dailyGame.kpop}
            setDailyGame={setDailyGame}
          />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default Home;

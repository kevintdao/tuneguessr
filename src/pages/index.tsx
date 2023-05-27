import { Box, Container, Tabs } from "@mantine/core";
import { type NextPage } from "next";
import { MdCancel, MdCheckCircle, MdInfo } from "react-icons/md";

import DailySong from "~/components/DailySong";
import GameHistoryModal from "~/components/Modal/GameHistoryModal";
import HowToPlayModal from "~/components/Modal/HowToPlayModal";
import { useApp } from "~/contexts/AppContext";
import { TABS } from "~/utils/constant";

export const CURR_DATE = new Date().toISOString().slice(0, 10);
export const NEXT_DATE = new Date(CURR_DATE);
NEXT_DATE.setDate(NEXT_DATE.getDate() + 1);

const Home: NextPage = () => {
  const { popup, setPopup, dailyGame, setDailyGame } = useApp();

  const handleClosePopup = () => {
    setPopup({
      open: false,
      type: "",
    });
  };

  return (
    <Container size="md" p={0}>
      <Tabs defaultValue="pop" orientation="vertical" variant="outline">
        <Tabs.List>
          {TABS.map((tab) => {
            const game = dailyGame[tab.value];
            const correct = game?.correct;
            const giveUp = game?.giveUp;

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

        {TABS.map((tab) => (
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

      <HowToPlayModal
        open={popup.open && popup.type === "help"}
        onClose={handleClosePopup}
      />

      <GameHistoryModal
        open={popup.open && popup.type === "history"}
        onClose={handleClosePopup}
      />
    </Container>
  );
};

export default Home;

import { Box, Button, Container, Flex, Tabs } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type NextPage } from "next";
import { type Dispatch, type SetStateAction, useState } from "react";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdCancel,
  MdCheckCircle,
  MdInfo,
} from "react-icons/md";

import DailySong from "~/components/DailySong";
import GameHistoryModal from "~/components/Modal/GameHistoryModal";
import HowToPlayModal from "~/components/Modal/HowToPlayModal";
import { useApp } from "~/contexts/AppContext";
import { SCREEN, TABS } from "~/utils/constant";

export const CURR_DATE = new Date().toISOString().slice(0, 10);
const newDate = new Date(CURR_DATE);
export const NEXT_DATE = newDate.setDate(newDate.getDate() + 1);

interface TabNavigationProps {
  tabValue: string;
  setTabValue: Dispatch<SetStateAction<string>>;
}

const TabNavigation = ({ tabValue, setTabValue }: TabNavigationProps) => {
  const tabIndex = TABS.findIndex((tab) => tab.value === tabValue);
  const tabArray = TABS.map((tab) => tab.value);

  const handleNextTab = () => {
    const nextTab = tabArray[tabIndex + 1];

    if (!nextTab) {
      setTabValue(tabArray[0] as string);
      return;
    }

    setTabValue(nextTab);
  };

  const handlePrevTab = () => {
    const prevTab = tabArray[tabIndex - 1];

    if (!prevTab) {
      setTabValue(tabArray[tabArray.length - 1] as string);
      return;
    }

    setTabValue(prevTab);
  };

  return (
    <Flex justify="space-between" mb={8}>
      <Button
        leftIcon={<MdArrowBackIos />}
        onClick={handlePrevTab}
        sx={{ textTransform: "uppercase" }}
      >
        Prev
      </Button>
      <Button
        rightIcon={<MdArrowForwardIos />}
        onClick={handleNextTab}
        sx={{ textTransform: "uppercase" }}
      >
        Next
      </Button>
    </Flex>
  );
};

const Home: NextPage = () => {
  const { popup, setPopup, dailyGame, setDailyGame } = useApp();

  const smallScreen = useMediaQuery(SCREEN.sm);

  const [tabValue, setTabValue] = useState("pop");

  const handleClosePopup = () => {
    setPopup({
      open: false,
      type: "",
    });
  };

  const handleTabChange = (tab: string) => {
    setTabValue(tab);
  };

  return (
    <Container size="lg" p={0}>
      <Tabs
        value={tabValue}
        onTabChange={handleTabChange}
        orientation={smallScreen ? "horizontal" : "vertical"}
        variant="outline"
        sx={{ minHeight: "calc(100vh - 120px)" }}
      >
        {smallScreen ? (
          <TabNavigation tabValue={tabValue} setTabValue={setTabValue} />
        ) : (
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
        )}

        {TABS.map((tab) => (
          <Tabs.Panel
            key={tab.value}
            value={tab.value}
            pl={smallScreen ? 0 : 6}
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

      {/* popup */}
      <HowToPlayModal
        open={popup.open && popup.type === "help"}
        onClose={handleClosePopup}
      />

      <GameHistoryModal
        open={popup.open && popup.type === "history"}
        onClose={handleClosePopup}
      />
      {/* /popup */}
    </Container>
  );
};

export default Home;

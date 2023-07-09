import {
  Box,
  Button,
  Container,
  Drawer,
  Flex,
  NavLink,
  Tabs,
  Text,
} from "@mantine/core";
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

function getProgressIcon(game: Game) {
  const correct = game?.correct;
  const giveUp = game?.giveUp;

  if (correct) {
    return <MdCheckCircle color="green" />;
  } else if (giveUp) {
    return <MdCancel color="red" />;
  } else {
    return <MdInfo color="grey" />;
  }
}

const TabNavigation = ({ tabValue, setTabValue }: TabNavigationProps) => {
  const tabIndex = TABS.findIndex((tab) => tab.value === tabValue);
  const tabArray = TABS.map((tab) => tab.value);
  const tabArrayLength = tabArray.length;

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
      setTabValue(tabArray[tabArrayLength - 1] as string);
      return;
    }

    setTabValue(prevTab);
  };

  return (
    <Flex justify="space-between" align="center" mb={8}>
      <Button
        variant="default"
        leftIcon={<MdArrowBackIos />}
        onClick={handlePrevTab}
        sx={{ textTransform: "uppercase" }}
      >
        Prev
      </Button>
      <Text fz="xl">{`${tabIndex + 1}/${tabArrayLength}`}</Text>
      <Button
        variant="default"
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
  const { popup, setPopup, dailyGame, setDailyGame, opened, toggle } = useApp();

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
        {smallScreen ? null : (
          <Tabs.List>
            {TABS.map((tab) => {
              const game = dailyGame[tab.value];
              const icon = getProgressIcon(game);

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
            <TabNavigation tabValue={tabValue} setTabValue={setTabValue} />

            <DailySong
              label={tab.label}
              genre={tab.value}
              dailyGame={dailyGame[tab.value]}
              setDailyGame={setDailyGame}
            />
          </Tabs.Panel>
        ))}
      </Tabs>

      {/* drawer */}
      <Drawer
        opened={opened}
        onClose={toggle}
        title="Genres"
        size={200}
        withCloseButton
      >
        {TABS.map((tab) => {
          const game = dailyGame[tab.value];
          const icon = getProgressIcon(game);
          return (
            <NavLink
              key={tab.value}
              label={tab.label}
              icon={icon}
              onClick={() => {
                handleTabChange(tab.value);
                toggle();
              }}
            />
          );
        })}
      </Drawer>
      {/* /drawer */}

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

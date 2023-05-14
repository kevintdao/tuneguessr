import { ActionIcon, Flex, Grid, Text, Title, Tooltip } from "@mantine/core";
import React from "react";
import { MdHelp } from "react-icons/md";
import Streak from "./Streak";
import { CURR_DATE } from "~/pages";

const Header = ({
  setHelpOpened,
  streak,
  genre,
}: {
  setHelpOpened: React.Dispatch<React.SetStateAction<boolean>>;
  streak: number;
  genre: string;
}) => {
  return (
    <>
      <Grid>
        <Grid.Col span={2}>
          <Streak streak={streak} />
        </Grid.Col>
        <Grid.Col span="auto" sx={{ paddingBottom: 2 }}>
          <Title order={3} align="center">
            Genre: {genre}
          </Title>
          <Text c="dimmed" fz="xs" fs="italic" align="center">
            {CURR_DATE}
          </Text>
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
    </>
  );
};

export default Header;

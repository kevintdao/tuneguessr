import { ActionIcon, Flex, Grid, Title, Tooltip } from "@mantine/core";
import React from "react";
import Streak from "../Streak";
import { MdHelp } from "react-icons/md";

const Header = ({
  setHelpOpened,
  streak,
}: {
  setHelpOpened: React.Dispatch<React.SetStateAction<boolean>>;
  streak: number;
}) => {
  return (
    <Grid>
      <Grid.Col span={2}>
        <Streak streak={streak} />
      </Grid.Col>
      <Grid.Col span="auto">
        <Title order={3} align="center">
          Daily Song
        </Title>
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
  );
};

export default Header;

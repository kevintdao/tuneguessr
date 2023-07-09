import {
  ActionIcon,
  Divider,
  Flex,
  Grid,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { MdHelp } from "react-icons/md";

import Streak from "./Streak";

import { useApp } from "~/contexts/AppContext";
import { CURR_DATE } from "~/pages";

const Header = ({ streak, genre }: { streak: number; genre: string }) => {
  const { setPopup } = useApp();

  return (
    <>
      <Grid>
        <Grid.Col span={2}>
          <Streak streak={streak} />
        </Grid.Col>
        <Grid.Col span="auto" sx={{ paddingBottom: 2 }}>
          <Title order={3} align="center">
            {genre}
          </Title>
          <Divider
            size={4}
            sx={{ width: 32, borderRadius: 2, margin: "2px auto 8px" }}
          />
          <Text c="dimmed" fz="xs" fs="italic" align="center">
            {CURR_DATE}
          </Text>
        </Grid.Col>

        <Grid.Col span={2}>
          <Flex justify="flex-end">
            <Tooltip
              label="How to Play"
              withArrow
              onClick={() =>
                setPopup({
                  open: true,
                  type: "help",
                })
              }
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

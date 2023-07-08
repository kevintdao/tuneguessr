import {
  ActionIcon,
  Container,
  Flex,
  Grid,
  Header,
  Text,
  Tooltip,
} from "@mantine/core";
import Link from "next/link";
import { MdHistory } from "react-icons/md";

import { useApp } from "~/contexts/AppContext";

export default function LayoutHeader() {
  const { setPopup } = useApp();

  return (
    <Header height={48} p={8}>
      <Container size="lg" px={8}>
        <Grid>
          <Grid.Col span="auto">
            <Flex align="center">
              <Link href="/">
                <Text
                  fz="xl"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                  sx={{ display: "flex" }}
                >
                  <Text mr={5}>🎵</Text>
                  <Text fw={700}>Tune</Text>
                  <Text fw={500}>Gussr</Text>
                </Text>
              </Link>
            </Flex>
          </Grid.Col>

          <Grid.Col span={1}>
            <Flex align="center" justify="end">
              <Tooltip
                label="History"
                withArrow
                onClick={() =>
                  setPopup({
                    open: true,
                    type: "history",
                  })
                }
              >
                <ActionIcon>
                  <MdHistory size={20} />
                </ActionIcon>
              </Tooltip>
            </Flex>
          </Grid.Col>
        </Grid>
      </Container>
    </Header>
  );
}

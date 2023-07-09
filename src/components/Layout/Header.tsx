import {
  ActionIcon,
  Burger,
  Container,
  Flex,
  Grid,
  Header,
  Text,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { MdHistory } from "react-icons/md";

import { useApp } from "~/contexts/AppContext";
import { SCREEN } from "~/utils/constant";

export default function LayoutHeader() {
  const { setPopup, opened, toggle } = useApp();

  const smallScreen = useMediaQuery(SCREEN.sm);

  const label = opened ? "Close navigation" : "Open navigation";

  return (
    <Header height={48} p={8}>
      <Container size="lg" px={8}>
        <Grid>
          <Grid.Col span="auto">
            <Flex align="center" gap={8}>
              {smallScreen ? (
                <Burger
                  size="sm"
                  opened={opened}
                  onClick={toggle}
                  aria-label={label}
                />
              ) : null}

              <Link href="/">
                <Text
                  fz="xl"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                >
                  <Text component="span">♬</Text>{" "}
                  <Text component="span" fw={700}>
                    Tune
                  </Text>
                  <Text component="span" fw={500}>
                    Gussr
                  </Text>
                </Text>
              </Link>
            </Flex>
          </Grid.Col>

          <Grid.Col span={1} sx={{ display: "flex", justifyContent: "end" }}>
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

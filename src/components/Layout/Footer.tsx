import {
  Anchor,
  Container,
  Flex,
  Footer,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import Link from "next/link";
import MantineLogo from "../Icon/MantineIcon";
import NextIcon from "../Icon/NextIcon";
import SpotifyIcon from "../Icon/SpotifyIcon";
import TypescriptIcon from "../Icon/TypescriptIcon";

const today = new Date();
const year = today.getFullYear();

export default function LayoutFooter() {
  return (
    <Footer height={{ base: 70, xs: 44 }} p={8}>
      <Container size="sm">
        <Flex
          gap={4}
          direction={{ base: "column", xs: "row" }}
          justify="space-between"
          align="center"
        >
          <Flex justify={{ base: "center", xs: "flex-start" }}>
            <Paper withBorder p={0}>
              <Group spacing="sm" sx={{ padding: "0px 8px 0px" }}>
                <Text fw={700} fs="sm">
                  Built with
                </Text>
                <Group spacing={8}>
                  <NextIcon width="20" />
                  <TypescriptIcon width="20" />
                  <MantineLogo width="20" />
                  <SpotifyIcon width="20" />
                </Group>
              </Group>
            </Paper>
          </Flex>
          <Flex justify={{ base: "center", xs: "flex-end" }}>
            <Text align="match-parent">
              © {year}{" "}
              <Anchor
                component={Link}
                href="https://github.com/kevintdao"
                target="_blank"
              >
                Kevin Dao
              </Anchor>
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Footer>
  );
}

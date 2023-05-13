import { Box, Flex, Header, Text } from "@mantine/core";
import Link from "next/link";

export default function LayoutHeader() {
  return (
    <Header height={60} p="xs" sx={{ left: 0 }}>
      <Flex
        justify={{
          base: "center",
          xs: "flex-start",
        }}
        style={{
          height: "100%",
        }}
      >
        <Box style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Link href="/">
            <Text
              fw={700}
              fz="xl"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            >
              ♬ Tuneguessr
            </Text>
          </Link>
        </Box>
      </Flex>
    </Header>
  );
}

import { Anchor, Container, Flex, Footer, Text } from "@mantine/core";
import Link from "next/link";

const today = new Date();
const year = today.getFullYear();

export default function LayoutFooter() {
  return (
    <Footer height={{ base: 40 }} p={8}>
      <Container size="lg" px={8}>
        <Flex gap={4} justify="center" align="center">
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

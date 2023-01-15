import { Flex, Footer, Group, Paper, Text } from '@mantine/core';
import MantineLogo from '../Icon/MantineIcon';
import ReactIcon from '../Icon/ReactIcon';
import SpotifyIcon from '../Icon/SpotifyIcon';
import TypescriptIcon from '../Icon/TypescriptIcon';

const today = new Date();
const year = today.getFullYear();

export default function LayoutFooter() {
  return (
    <Footer height={{ base: 80, xs: 60 }} p="md">
      <Flex gap="sm" direction={{ base: 'column', xs: 'row' }} justify="space-between">
        <Flex justify={{ base: 'center', xs: 'flex-start' }}>
          <Paper withBorder p={0}>
            <Group spacing="sm" sx={{ padding: '0px 8px 0px' }}>
              <Text fw={700} fs="sm">
                Built with
              </Text>
              <Group spacing={8}>
                <ReactIcon width="20" />
                <TypescriptIcon width="20" />
                <MantineLogo width="20" />
                <SpotifyIcon width="20" />
              </Group>
            </Group>
          </Paper>
        </Flex>
        <Flex justify={{ base: 'center', xs: 'flex-end' }}>
          <Text align="match-parent">© {year} Kevin Dao</Text>
        </Flex>
      </Flex>
    </Footer>
  );
}

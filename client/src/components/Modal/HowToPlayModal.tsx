import { List, Modal, Stack, Text, Title } from '@mantine/core';
import React from 'react';

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HowToPlayModal({ opened, setOpened }: Props) {
  return (
    <Modal size="auto" opened={opened} onClose={() => setOpened(false)} title={<Title order={3}>How to Play</Title>}>
      <Stack>
        <List>
          <List.Item>Play the 30 seconds audio</List.Item>
          <List.Item>Guess the song</List.Item>
          <List.Item>If you can&apos;t guess the song, you can give up to see the answer</List.Item>
        </List>

        <Text c="dimmed" fs="italic" fz="sm">
          The song resets at 6:00 PM CST
        </Text>
      </Stack>
    </Modal>
  );
}

import { List, Modal, Stack, Text, Title } from "@mantine/core";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function HowToPlayModal({ open, onClose }: Props) {
  return (
    <Modal
      size="lg"
      opened={open}
      onClose={onClose}
      title={<Title order={3}>How to Play</Title>}
    >
      <Stack>
        <List icon="•">
          <List.Item>Play the 30 seconds audio.</List.Item>
          <List.Item>Guess the song.</List.Item>
          <List.Item>
            If you can&apos;t guess the song, you can give up to see the answer.
          </List.Item>
          <List.Item>
            Keep up your streak when you correctly guess the song consecutively.
          </List.Item>
          <List.Item>
            Streak will reset when you miss a day or gave up on a song.
          </List.Item>
        </List>

        <Text c="dimmed" fs="italic" fz="sm">
          The song resets at 6:00 PM or 7:00 PM CST
        </Text>
      </Stack>
    </Modal>
  );
}

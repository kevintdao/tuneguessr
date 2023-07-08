import {
  Box,
  Card,
  Modal,
  ScrollArea,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { MdCancel, MdCheckCircle } from "react-icons/md";

import { useApp } from "~/contexts/AppContext";
import { TABS } from "~/utils/constant";

interface GameHistoryModalProps {
  open: boolean;
  onClose: () => void;
}

interface HistoryProps {
  history: History[];
}

function History({ history }: HistoryProps) {
  return (
    <Stack spacing={4}>
      {history.map((item) => (
        <Card
          key={item.date}
          withBorder
          p="xs"
          sx={{
            flex: 1,
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Text>{item.date}</Text>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "between",
            }}
          >
            {item.result === "correct" ? (
              <MdCheckCircle size={24} color="green" />
            ) : (
              <MdCancel size={24} color="red" />
            )}
          </Box>
        </Card>
      ))}
    </Stack>
  );
}

export default function GameHistoryModal({
  open,
  onClose,
}: GameHistoryModalProps) {
  const { dailyGame } = useApp();

  return (
    <Modal
      size="lg"
      opened={open}
      onClose={onClose}
      title={<Title order={3}>Game History</Title>}
    >
      <Tabs defaultValue="pop" orientation="vertical" variant="outline">
        <Tabs.List>
          {TABS.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {TABS.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value} pl={6}>
            <ScrollArea h={350}>
              <History history={dailyGame[tab.value]?.history ?? []} />
            </ScrollArea>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Modal>
  );
}

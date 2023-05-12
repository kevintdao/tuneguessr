import { ActionIcon, Flex, Text, Tooltip } from "@mantine/core";
import { MdLocalFireDepartment } from "react-icons/md";

interface Props {
  streak: number;
}

function StreakIcon({ streak }: Props) {
  let color;
  if (streak > 0 && streak < 4) color = "#FFA8A8";
  if (streak >= 4 && streak < 8) color = "#FA5252";
  if (streak >= 8) color = "#C92A2A";

  return <MdLocalFireDepartment size={20} color={color} />;
}

export default function Streak({ streak }: Props) {
  return (
    <Flex align="center">
      <Tooltip withArrow label="Streak">
        <ActionIcon variant="transparent" sx={{ cursor: "default" }}>
          <StreakIcon streak={streak} />
        </ActionIcon>
      </Tooltip>
      <Text>{streak}</Text>
    </Flex>
  );
}

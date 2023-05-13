import { Flex, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { MdLocalFireDepartment } from "react-icons/md";

const Streak = ({ streak }: { streak: number }) => {
  function StreakIcon({ streak }: { streak: number }) {
    let color;
    if (streak > 0 && streak < 4) color = "#FFA8A8";
    if (streak >= 4 && streak < 8) color = "#FA5252";
    if (streak >= 8) color = "#C92A2A";

    return <MdLocalFireDepartment size={20} color={color} />;
  }

  return (
    <Flex align="center">
      <Tooltip withArrow label="Streak">
        <ThemeIcon variant="transparent">
          <StreakIcon streak={streak} />
        </ThemeIcon>
      </Tooltip>
      <Text>{streak}</Text>
    </Flex>
  );
};

export default Streak;

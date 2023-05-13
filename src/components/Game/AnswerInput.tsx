import {
  ActionIcon,
  Button,
  Flex,
  MediaQuery,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { MdCancel, MdSend } from "react-icons/md";

const AnswerInput = ({
  answer,
  setAnswer,
  handleGuess,
  handleGiveUp,
}: {
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  handleGuess: () => void;
  handleGiveUp: () => void;
}) => {
  const handleGuessMouseDown = (e: React.KeyboardEvent) => {
    if (answer !== "" && e.key === "Enter") {
      handleGuess();
    }
  };

  const handleGuessClick = (e: React.MouseEvent) => {
    if (answer !== "" && e.type === "click") {
      handleGuess();
    }
  };

  return (
    <Flex gap={8} align="center">
      <TextInput
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.currentTarget.value)}
        onKeyDown={handleGuessMouseDown}
        sx={{ flex: 1 }}
      />

      {/* mobile buttons */}
      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
        <Tooltip label="Guess" withArrow>
          <ActionIcon color="blue" onClick={handleGuessClick}>
            <MdSend size={20} />
          </ActionIcon>
        </Tooltip>
      </MediaQuery>
      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
        <Tooltip label="Give Up" withArrow onClick={handleGiveUp}>
          <ActionIcon color="red">
            <MdCancel size={20} />
          </ActionIcon>
        </Tooltip>
      </MediaQuery>

      {/* buttons */}
      <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
        <Button leftIcon={<MdSend size={20} />} onClick={handleGuessClick}>
          Guess
        </Button>
      </MediaQuery>
      <MediaQuery smallerThan="xs" styles={{ display: "none" }}>
        <Button
          color="red"
          leftIcon={<MdCancel size={20} />}
          onClick={handleGiveUp}
        >
          Give Up
        </Button>
      </MediaQuery>
    </Flex>
  );
};

export default AnswerInput;

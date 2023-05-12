import { Center, Container, Loader } from "@mantine/core";

interface LoadingProps {
  center?: boolean;
}

export default function Loading({ center }: LoadingProps) {
  return center ? (
    <Container size="sm">
      <Center>
        <Loader />
      </Center>
    </Container>
  ) : (
    <Loader />
  );
}

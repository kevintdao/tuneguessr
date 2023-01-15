import { Center, Container, Loader } from '@mantine/core';

interface Props {
  center?: boolean;
}

export default function Loading({ center }: Props) {
  return center ? (
    <Container size="lg">
      <Center>
        <Loader />
      </Center>
    </Container>
  ) : (
    <Loader />
  );
}

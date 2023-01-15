import { Alert, Container } from '@mantine/core';
import { IoMdAlert } from 'react-icons/io';

interface Props {
  error: string;
  container?: boolean;
}

export default function Error({ error, container }: Props) {
  return container ? (
    <Container size="lg">
      <Alert icon={<IoMdAlert size={16} />} title="Error" color="red">
        {error}
      </Alert>
    </Container>
  ) : (
    <Alert icon={<IoMdAlert size={16} />} title="Error" color="red">
      {error}
    </Alert>
  );
}

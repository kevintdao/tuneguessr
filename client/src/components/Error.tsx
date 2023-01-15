import { Alert } from '@mantine/core';
import { IoMdAlert } from 'react-icons/io';

interface Props {
  error: string;
}

export default function Error({ error }: Props) {
  return (
    <Alert icon={<IoMdAlert size={16} />} title="Error" color="red">
      {error}
    </Alert>
  );
}

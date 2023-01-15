import { Loader } from '@mantine/core';
import { useQuery } from 'react-query';
import DailySong from '../components/DailySong';
import Error from '../components/Error';
import { getDailySong } from '../lib/api';

interface DSong {
  data: {
    content: string;
  };
}

export default function Root() {
  const { isLoading, isError, data, error } = useQuery<DSong, Error>('dailysong', getDailySong);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error.message} />;
  }

  return data ? <DailySong content={data.data.content} /> : null;
}

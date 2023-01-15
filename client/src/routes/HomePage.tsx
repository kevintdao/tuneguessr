import { useQuery } from 'react-query';
import DailySong from '../components/DailySong';
import Error from '../components/Error';
import Loading from '../components/Loading';
import { getDailySong } from '../lib/api';

interface DSong {
  data: {
    content: string;
  };
}

export default function Root() {
  const { isLoading, isError, data, error } = useQuery<DSong, Error>('dailysong', getDailySong);

  if (isLoading) {
    return <Loading center />;
  }

  if (isError) {
    return <Error error={error.message} container />;
  }

  return data ? <DailySong content={data.data.content} /> : null;
}

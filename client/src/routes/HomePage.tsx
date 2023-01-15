import { useLocalStorage } from '@mantine/hooks';
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
  const [dailyGame, setDailyGame] = useLocalStorage({
    key: 'daily-song',
    defaultValue: {
      correct: false,
      giveUp: false,
      streak: 0,
      guesses: [],
      date: new Date().toISOString().slice(0, 10),
    } as DGame,
    getInitialValueInEffect: true,
  });

  if (isLoading) return <Loading center />;

  if (isError) return <Error error={error.message} container />;

  return data ? <DailySong content={data.data.content} dailyGame={dailyGame} setDailyGame={setDailyGame} /> : null;
}

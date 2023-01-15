// song type
interface Song {
  _id: string;
  song_id: string;
  name: string;
  album: {
    id: string;
    name: string;
    image: {
      url: string;
    };
    external_url: string;
  };
  artists: { id: string; name: string }[];
  url: string;
  answer: string;
}

// daily game type
interface DGame {
  correct: boolean;
  giveUp: boolean;
  streak: number;
  guesses: string[];
  date: string;
}

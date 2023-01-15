type Song = {
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
};

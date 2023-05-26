interface SpotifyData {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyResponse {
  data: SpotifyData;
}

interface PlaylistData {
  track: {
    href: string;
  };
}

interface PlaylistResponse {
  data: {
    items: PlaylistData[];
  };
}

interface TrackResponse {
  data: SongInput;
}

interface SongInput {
  id: string;
  album: Album;
  artists: [Artist];
  name: string;
  href: string;
  preview_url: string;
  external_urls: {
    spotify: string;
  };
  genre: Genre;
}

interface Song {
  _id: string;
  songId: string;
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

interface Album {
  id: string;
  name: string;
  image?: string;
  images: [string];
  external_urls: {
    spotify: string;
  };
}

interface Artist {
  id: string;
  name: string;
}

interface Game {
  correct: boolean;
  giveUp: boolean;
  streak: number;
  guesses: string[];
  date: string;
}

interface DailyGame {
  pop: Game;
  kpop: Game;
  latin: Game;
  dance: Game;
  "80s": Game;
  "90s": Game;
  "2000s": Game;
  "2010s": Game;
}

type Genre =
  | "pop"
  | "kpop"
  | "latin"
  | "dance"
  | "80s"
  | "90s"
  | "2000s"
  | "2010s";

interface Tab {
  label: string;
  value: Genre;
}

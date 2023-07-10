export const INITIAL_GAME: Game = {
  correct: false,
  giveUp: false,
  maxGuesses: false,
  streak: 0,
  guesses: [],
  date: new Date().toISOString().slice(0, 10),
  history: [],
};

export const GAME: DailyGame = {
  pop: INITIAL_GAME,
  kpop: INITIAL_GAME,
  latin: INITIAL_GAME,
  dance: INITIAL_GAME,
  "80s": INITIAL_GAME,
  "90s": INITIAL_GAME,
  "2000s": INITIAL_GAME,
  "2010s": INITIAL_GAME,
};

export const TABS: Tab[] = [
  {
    label: "Pop",
    value: "pop",
  },
  {
    label: "K-Pop",
    value: "kpop",
  },
  {
    label: "Latin",
    value: "latin",
  },
  {
    label: "Dance",
    value: "dance",
  },
  {
    label: "80s",
    value: "80s",
  },
  {
    label: "90s",
    value: "90s",
  },
  {
    label: "2000s",
    value: "2000s",
  },
  {
    label: "2010s",
    value: "2010s",
  },
];

export const SCREEN = {
  xs: "(max-width: 36em)",
  sm: "(max-width: 48em)",
  md: "(max-width: 62em)",
  lg: "(max-width: 75em)",
  xl: "(max-width: 88em)",
};

export const MAX_GUESSES = 5;

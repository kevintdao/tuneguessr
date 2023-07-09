import { createContext, type ReactNode, useContext, useState } from "react";

interface PlayerContextProps {
  children: ReactNode;
}

interface PlayerContext {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: IsPlaying;
  setIsPlaying: React.Dispatch<React.SetStateAction<IsPlaying>>;
}

interface IsPlaying {
  state: boolean;
  value?: Genre;
}

export const PlayerContext = createContext({} as PlayerContext);

export function usePlayer() {
  return useContext(PlayerContext);
}

export default function PlayerProvider({ children }: PlayerContextProps) {
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState<IsPlaying>({
    state: false,
  });

  const value = {
    volume,
    setVolume,
    isPlaying,
    setIsPlaying,
  };
  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

import { useLocalStorage } from "@mantine/hooks";
import { createContext, type ReactNode, useContext, useState } from "react";

import { GAME } from "~/utils/constant";

interface AppContextProps {
  children: ReactNode;
}

interface Popup {
  open: boolean;
  type: "help" | "history" | "";
}

interface AppContext {
  popup: Popup;
  setPopup: React.Dispatch<React.SetStateAction<Popup>>;
  dailyGame: DailyGame;
  setDailyGame: (
    val: DailyGame | ((prevState: DailyGame) => DailyGame)
  ) => void;
}

export const AppContext = createContext({} as AppContext);

export function useApp() {
  return useContext(AppContext);
}

export default function AppProvider({ children }: AppContextProps) {
  const [popup, setPopup] = useState<Popup>({
    open: false,
    type: "",
  });

  const [dailyGame, setDailyGame] = useLocalStorage({
    key: "daily-song",
    defaultValue: GAME,
    getInitialValueInEffect: true,
  });

  const value = {
    popup,
    setPopup,
    dailyGame,
    setDailyGame,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

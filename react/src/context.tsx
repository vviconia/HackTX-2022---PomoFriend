import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextProps {
  study: number;
  setStudy: React.Dispatch<React.SetStateAction<number>>;
  rest: number;
  setRest: React.Dispatch<React.SetStateAction<number>>;
  cycles: number;
  setCycles: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextProps>({
  study: 0,
  setStudy: () => undefined,
  rest: 0,
  setRest: () => undefined,
  cycles: 0,
  setCycles: () => undefined,
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [study, setStudy] = useState(25);
  const [rest, setRest] = useState(5);
  const [cycles, setCycles] = useState(3);

  return (
    <AppContext.Provider
      value={{
        study,
        setStudy,
        rest,
        setRest,
        cycles,
        setCycles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

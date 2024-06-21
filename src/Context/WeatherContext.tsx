import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
} from "react";

interface WeatherContextProps {
  searchCity: string;
  setSearchCity: (searchCity: string) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined,
);

const WeatherContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchCity, setSearchCity] = useState<string>("");

  const contextValue = React.useMemo(
    () => ({ searchCity, setSearchCity }),
    [searchCity],
  );

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export const MemoizedWeatherContextProvider = React.memo(
  WeatherContextProvider,
);

export const useWeatherContext = (): WeatherContextProps => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error(
      "useWeatherContext must be used within a WeatherContextProvider",
    );
  }
  return context;
};

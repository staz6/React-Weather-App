import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  dt: number;
  weather: {
    icon: string;
  }[];
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  rain?: {
    "1h": number;
  };
  wind: {
    speed: number;
  };
}

interface WeatherContextProps {
  searchCity: string;
  setSearchCity: (searchCity: string) => void;
  currentWeatherData: WeatherData | null;
  setCurrentWeatherData: Dispatch<SetStateAction<WeatherData | null>>;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined,
);

const WeatherContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [currentWeatherData, setCurrentWeatherData] =
    useState<WeatherData | null>(null);

  const contextValue = React.useMemo(
    () => ({
      searchCity,
      setSearchCity,
      currentWeatherData,
      setCurrentWeatherData,
    }),
    [searchCity, currentWeatherData],
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

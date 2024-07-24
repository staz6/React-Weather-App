import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  dt: number;
  weather: {
    icon: string;
  }[];
  sys: {
    pod?: string;
    type?: number;
    id?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  rain?: {
    "1h": number;
  };
  wind: {
    speed: number;
  };
}

interface ForecastData {
  sys: {
    pod: string;
  };
  dt: number;
  wind: {
    speed: number;
  };
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: [
    {
      icon: string;
    },
  ];
  rain?: {
    "1h": number;
  };
}

export interface WeatherContextProps {
  searchCity: string;
  setSearchCity: (searchCity: string) => void;
  currentWeatherData: WeatherData | null;
  setCurrentWeatherData: Dispatch<SetStateAction<WeatherData | null>>;
  timeStamp: string;
  settimeStamp: (searchCity: string) => void;
  weatherForecastData: ForecastData[] | null;
  setWeatherForecastData: Dispatch<SetStateAction<ForecastData[] | null>>;
  favCity: string[];
  setFavCity: Dispatch<SetStateAction<string[]>>;
}

export const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined,
);

const WeatherContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchCity, setSearchCity] = useState<string>("");
  const [timeStamp, settimeStamp] = useState<string>("");
  const [currentWeatherData, setCurrentWeatherData] =
    useState<WeatherData | null>(null);
  const [weatherForecastData, setWeatherForecastData] = useState<
    ForecastData[] | null
  >(null);
  const [favCity, setFavCity] = useState<string[]>([]);

  const contextValue = React.useMemo(
    () => ({
      searchCity,
      setSearchCity,
      currentWeatherData,
      setCurrentWeatherData,
      timeStamp,
      settimeStamp,
      weatherForecastData,
      setWeatherForecastData,
      favCity,
      setFavCity,
    }),
    [searchCity, currentWeatherData, timeStamp, weatherForecastData, favCity],
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

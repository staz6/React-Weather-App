import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import API_KEY from "../ApiConfig/ApiConfig";

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
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
  };
}

const useCurrentWeather = (
  searchCity: string | undefined,
): {
  weatherData: WeatherData | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const { data, isLoading, isError, isSuccess } = useSuspenseQuery<WeatherData>(
    {
      queryKey: ["weather", searchCity],
      queryFn: async () => {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`,
        );
        return response.data;
      },
    },
  );

  const weatherData = useMemo(() => data, [data]);

  return { weatherData, isLoading, isError, isSuccess };
};

export default useCurrentWeather;

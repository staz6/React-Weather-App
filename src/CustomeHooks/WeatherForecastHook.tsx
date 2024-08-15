import {
  UseSuspenseQueryResult,
  useSuspenseQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import API_KEY from "../ApiConfig/ApiConfig";
import convertKelvinToCelsius, {
  getDayOfWeek,
} from "../HelperFunctions/Helper";

interface WeatherListItem {
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
  dt: number;
  sys: {
    pod: string;
  };
  wind: {
    speed: number;
  };
  rain?: {
    "1h": number;
  };
}

interface ForecastDataType {
  city: object;
  cnt: number;
  cod: string;
  list: WeatherListItem[];
  message: number;
}

interface ForecastItem {
  temp: number;
  icon: string;
  day: string;
  timeStamp: string;
}

const useWeatherForecast = (
  searchCity: string | undefined,
): {
  forecastData: ForecastItem[] | undefined;
  filteredData: WeatherListItem[] | undefined; // Adjusted to array of items or undefined
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  }: UseSuspenseQueryResult<ForecastDataType> =
    useSuspenseQuery<ForecastDataType>({
      queryKey: ["forecast", searchCity],
      queryFn: async () => {
        const response = await axios.get<ForecastDataType>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}`,
        );
        return response.data;
      },
    });

  const filteredData = useMemo(
    () =>
      data?.list.filter((timeperday) => timeperday.dt_txt.includes("18:00:00")), // Use .filter() to get an array
    [data],
  );

  const forecastData = useMemo(
    () =>
      filteredData
        ? filteredData.map((weather) => ({
            temp: parseFloat(
              convertKelvinToCelsius(weather.main.temp)?.toFixed() ?? "0",
            ),
            icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            day: getDayOfWeek(weather.dt_txt),
            timeStamp: weather.dt_txt,
          }))
        : undefined,
    [filteredData],
  );

  return { forecastData, filteredData, isLoading, isError, isSuccess };
};

export default useWeatherForecast;

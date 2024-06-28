import { useQuery, UseQueryResult } from "@tanstack/react-query";
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
  };
  weather: [
    {
      icon: string;
    },
  ];
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
}

const useWeatherForecast = (
  searchCity: string | undefined,
): {
  forecastData: ForecastItem[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError }: UseQueryResult<ForecastDataType> =
    useQuery<ForecastDataType>({
      queryKey: ["forecast", searchCity],
      queryFn: async () => {
        const response = await axios.get<ForecastDataType>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}`,
        );
        return response.data;
      },
      enabled: !!searchCity,
    });

  const forecastData = useMemo(
    () =>
      data?.list
        .filter((timeperday) => timeperday.dt_txt.includes("18:00:00"))
        .map((weather) => ({
          temp: parseFloat(
            convertKelvinToCelsius(weather.main.temp)?.toFixed() ?? "0",
          ),
          icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
          day: getDayOfWeek(weather.dt_txt),
        })),
    [data],
  );

  return { forecastData, isLoading, isError };
};

export default useWeatherForecast;

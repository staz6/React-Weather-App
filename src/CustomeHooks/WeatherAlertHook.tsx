import { useQuery } from "@tanstack/react-query";
import { ALERT_API_KEY } from "../ApiConfig/ApiConfig";

interface UseWeatherAlertHook {
  searchCity: string | null;
}

interface Alert {
  category: string;
  headline: string;
  desc: string;
}

export interface WeatherApiResponse {
  alerts: {
    alert: Alert[];
  };
}

const useWeatherAlert = ({
  searchCity,
}: UseWeatherAlertHook): {
  isLoading: boolean;
  isError: boolean;
  data: WeatherApiResponse | undefined;
} => {
  const { isLoading, isError, data } = useQuery<WeatherApiResponse>({
    queryKey: ["WeatherAlerts", searchCity],
    queryFn: () =>
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${ALERT_API_KEY}&q=${searchCity}&alerts=yes`,
      ).then((res) => res.json()),
    enabled: !!searchCity,
  });

  return { isLoading, isError, data };
};

export default useWeatherAlert;

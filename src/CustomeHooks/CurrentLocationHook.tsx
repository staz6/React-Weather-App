import { useQuery } from "@tanstack/react-query";
import API_KEY from "../ApiConfig/ApiConfig";

interface UseCityNameFetchProps {
  lat: number | null;
  lon: number | null;
}

const useCityNameFetch = ({
  lat,
  lon,
}: UseCityNameFetchProps): {
  cityName: string;
  isLoading: boolean;
} => {
  const { data, isLoading } = useQuery<{ name: string }>({
    queryKey: ["location", lat, lon],
    queryFn: () =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      ).then((res) => res.json()),
    enabled: !!lat && !!lon,
  });

  return {
    cityName: data?.name || "",
    isLoading,
  };
};

export default useCityNameFetch;

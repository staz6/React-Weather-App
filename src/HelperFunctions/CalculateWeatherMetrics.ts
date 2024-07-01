import { BiWind } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";
import { BsCloudRainHeavy } from "react-icons/bs";

interface Metric {
  Icon: React.ElementType;
  value: number | undefined;
  unit: string;
}

interface WeatherData {
  rain?: { "1h": number };
  wind: { speed: number };
  main: { humidity: number };
}

const calculateWeatherMetrics = (
  data: WeatherData | undefined | null,
): Metric[] => {
  const rainMetric = data?.rain?.["1h"];
  const windMetric = data?.wind.speed ?? 0;
  const humidityMetric = data?.main.humidity ?? 0;

  const metrics: Metric[] = [
    {
      Icon: BiWind,
      value: windMetric,
      unit: "km/h",
    },
    {
      Icon: WiHumidity,
      value: humidityMetric,
      unit: "%",
    },
    {
      Icon: BsCloudRainHeavy,
      value: rainMetric,
      unit: "mm",
    },
  ];

  return metrics;
};

export default calculateWeatherMetrics;

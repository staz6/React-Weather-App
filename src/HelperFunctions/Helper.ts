import { BiWind } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";
import { BsCloudRainHeavy } from "react-icons/bs";

export default function convertKelvinToCelsius(
  kelvin: number | undefined,
): number | undefined {
  return kelvin !== undefined ? kelvin - 273.15 : undefined;
}

interface WeatherData {
  sys: {
    sunrise: number;
    sunset: number;
  };
}
interface SunEventtimes {
  name: string;
  ampm: string;
  militaryTime: string;
}

export const suneventtimes = (
  currentWeatherData: WeatherData | undefined,
): SunEventtimes[] => {
  if (!currentWeatherData) return [];

  const { sunrise, sunset } = currentWeatherData.sys;

  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);

  const sunriseAMPM = sunriseDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const sunsetAMPM = sunsetDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  const sunrise24Hour = `${sunriseDate.getHours()}:${`0${sunriseDate.getMinutes()}`.slice(-2)}`;
  const sunset24Hour = `${sunsetDate.getHours()}:${`0${sunsetDate.getMinutes()}`.slice(-2)}`;

  const goldenHourStart = new Date(sunriseDate.getTime() + 60 * 60 * 1000);
  const goldenHourStartAMPM = goldenHourStart.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const goldenHourStart24Hour = `${goldenHourStart.getHours()}:${`0${goldenHourStart.getMinutes()}`.slice(-2)}`;

  return [
    { name: "Sunrise", ampm: sunriseAMPM, militaryTime: sunrise24Hour },
    {
      name: "Golden Hour",
      ampm: goldenHourStartAMPM,
      militaryTime: goldenHourStart24Hour,
    },
    { name: "Sunset", ampm: sunsetAMPM, militaryTime: sunset24Hour },
  ];
};

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

export { calculateWeatherMetrics };

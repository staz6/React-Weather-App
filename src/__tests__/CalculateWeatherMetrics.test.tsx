import { BiWind } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";
import { BsCloudRainHeavy } from "react-icons/bs";
import calculateWeatherMetrics, {
  WeatherData,
} from "../HelperFunctions/CalculateWeatherMetrics";

it("returns correct metrics for complete weather data", () => {
  const data: WeatherData = {
    rain: { "1h": 5 },
    wind: { speed: 15 },
    main: { humidity: 80 },
  };

  const metrics = calculateWeatherMetrics(data);

  expect(metrics).toEqual([
    { Icon: BiWind, value: 15, unit: "km/h" },
    { Icon: WiHumidity, value: 80, unit: "%" },
    { Icon: BsCloudRainHeavy, value: 5, unit: "mm" },
  ]);
});

it("returns correct metrics when rain data is missing", () => {
  const data: WeatherData = {
    wind: { speed: 10 },
    main: { humidity: 70 },
  };

  const metrics = calculateWeatherMetrics(data);

  expect(metrics).toEqual([
    { Icon: BiWind, value: 10, unit: "km/h" },
    { Icon: WiHumidity, value: 70, unit: "%" },
    { Icon: BsCloudRainHeavy, value: undefined, unit: "mm" },
  ]);
});
it("return correct values when data not available ", () => {
  const data = null;

  const metrics = calculateWeatherMetrics(data);

  expect(metrics).toEqual([
    { Icon: BiWind, value: 0, unit: "km/h" },
    { Icon: WiHumidity, value: 0, unit: "%" },
    { Icon: BsCloudRainHeavy, value: undefined, unit: "mm" },
  ]);
});

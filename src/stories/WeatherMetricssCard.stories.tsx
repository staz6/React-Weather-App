import { useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import WeatherMetricsCard from "../Components/Compound/WeahterMetricsCard";
import { WeatherContext, WeatherData } from "../Context/WeatherContext";

const mockCurrentWeatherData: WeatherData = {
  main: {
    temp: 25.3,
    humidity: 60,
  },
  dt: 1627905600,
  weather: [
    {
      icon: "10d",
    },
  ],
  sys: {
    pod: "d",
    type: 1,
    id: 1234,
    country: "US",
    sunrise: 1627894800,
    sunset: 1627944000,
  },
  rain: {
    "1h": 0.5,
  },
  wind: {
    speed: 3.5,
  },
};
const CustomWeatherContextProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const contextValue = useMemo(
    () => ({
      searchCity: "",
      setSearchCity() {},
      favCity: [],
      setFavCity() {},
      weatherForecastData: [],
      currentWeatherData: mockCurrentWeatherData,
      setCurrentWeatherData() {},
      timeStamp: "",
      settimeStamp() {},
      setWeatherForecastData() {},
    }),
    [],
  );
  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default {
  title: "Components/WeatherMetricsCard",
  component: WeatherMetricsCard,
  decorators: [
    (Story) => (
      <CustomWeatherContextProvider>
        <div className="bg-linearSideDark">
          <Story />
        </div>
      </CustomWeatherContextProvider>
    ),
  ],
} as Meta;
type Story = StoryObj<typeof WeatherMetricsCard>;

export const WeatherMetrics: Story = {};

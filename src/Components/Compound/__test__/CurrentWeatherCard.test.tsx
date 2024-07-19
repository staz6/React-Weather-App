import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../../../Context/ThemeChangerContext";
import { MemoizedWeatherContextProvider } from "../../../Context/WeatherContext";
import CurrentWeatherCard from "../CurrentWeatherCard";
import useCurrentWeather from "../../../CustomeHooks/CurrentWeatherHook";
import "@testing-library/jest-dom";
import convertKelvinToCelsius, {
  getDayOfWeek,
} from "../../../HelperFunctions/Helper";

const queryClient = new QueryClient();
jest.mock("axios");
jest.mock("../../../CustomeHooks/CurrentWeatherHook");

test("Testing rendering of ui elements", () => {
  (useCurrentWeather as jest.Mock).mockReturnValue({
    isLoading: false,
    isError: false,
    isSuccess: true,
    weatherData: {
      main: {
        temp: 192,
        humidity: 21,
      },
      dt: 1625247600,
      weather: [
        {
          icon: "01d",
        },
      ],
      sys: {
        type: 1,
        id: 1234,
        country: "US",
        sunrise: 1625205600,
        sunset: 1625260800,
      },
      wind: {
        speed: 5.5,
      },
    },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoizedWeatherContextProvider>
          <CurrentWeatherCard />
        </MemoizedWeatherContextProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );

  const WeatherIcon = screen.getByTestId("WeatherIcon");
  expect(WeatherIcon).toBeInTheDocument();
  const weatherTemperature = screen.getByTestId("temperature");
  const temperatureValue = convertKelvinToCelsius(192);
  const formattedTemperature =
    temperatureValue !== undefined ? temperatureValue.toFixed() : "";
  expect(weatherTemperature).toHaveTextContent(`${formattedTemperature}°C`);
});
test("Testing rendering of ui elements", () => {
  (useCurrentWeather as jest.Mock).mockReturnValue({
    isLoading: false,
    isError: true,
    isSuccess: false,
    weatherData: {},
  });
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoizedWeatherContextProvider>
          <CurrentWeatherCard />
        </MemoizedWeatherContextProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );

  const errordisplay = screen.getByText("No Such City Exist");
  expect(errordisplay).toBeInTheDocument();
});
test("Testing helper function convertKelvinToCelsius", () => {
  const kelvin = 200;
  const celcius = Number(convertKelvinToCelsius(kelvin)?.toFixed());
  expect(celcius).toBe(-73);
});
test("Testing helper function getDayOfWeek", () => {
  const dateTimestamp = "2024-07-16 12:00:00";
  const day = getDayOfWeek(dateTimestamp);
  const expectedDay = "Tue";
  expect(day).toBe(expectedDay);
});

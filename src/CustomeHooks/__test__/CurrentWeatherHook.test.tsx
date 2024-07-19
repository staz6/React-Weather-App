import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import useCurrentWeather, { WeatherData } from "../CurrentWeatherHook";

const queryClient = new QueryClient();

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponse: WeatherData = {
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
};

test("Testing hook when valid city is provided", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

  const { result } = renderHook(() => useCurrentWeather("California"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.weatherData).toEqual(mockResponse);
  expect(result.current.isError).toBe(false);
});

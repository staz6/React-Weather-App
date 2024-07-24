import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import useWeatherForecast from "../WeatherForecastHook";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const queryClient = new QueryClient();

describe("useWeatherForecast", () => {
  it("fetches and filters forecast data correctly", async () => {
    const mockData = {
      city: {},
      cnt: 40,
      cod: "200",
      list: [
        {
          dt_txt: "2024-07-19 18:00:00",
          main: {
            temp: 295.15,
            humidity: 50,
          },
          weather: [
            {
              icon: "04d",
            },
          ],
          dt: 1626015600,
          sys: {
            pod: "d",
          },
          wind: {
            speed: 3.1,
          },
        },
      ],
      message: 0,
    };

    mockedAxios.get.mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useWeatherForecast("London"), {
      wrapper: ({ children }): JSX.Element => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.filteredData).toEqual([
      {
        dt_txt: "2024-07-19 18:00:00",
        main: {
          temp: 295.15,
          humidity: 50,
        },
        weather: [
          {
            icon: "04d",
          },
        ],
        dt: 1626015600,
        sys: {
          pod: "d",
        },
        wind: {
          speed: 3.1,
        },
      },
    ]);

    expect(result.current.forecastData).toEqual([
      {
        temp: 22,
        icon: "https://openweathermap.org/img/wn/04d@2x.png",
        day: "Fri",
        timeStamp: "2024-07-19 18:00:00",
      },
    ]);
  });
});

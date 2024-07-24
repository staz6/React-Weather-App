import { render, screen } from "@testing-library/react";
import { MemoizedWeatherContextProvider } from "../../../Context/WeatherContext";
import useWeatherForecast from "../../../CustomeHooks/WeatherForecastHook";
import "@testing-library/jest-dom";
import WeatherForecastCard from "../../Complex/WeatherForecastCard";

jest.mock("../../../CustomeHooks/WeatherForecastHook");
jest.mock("react-slick", () => ({
  __esModule: true,
  default: ({ children }: { children: JSX.Element }) => <div>{children}</div>,
}));
describe("WeatherForecastCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders error state", () => {
    (useWeatherForecast as jest.Mock).mockReturnValue({
      forecastData: undefined,
      filteredData: undefined,
      isLoading: false,
      isError: true,
      isSuccess: false,
    });

    render(
      <MemoizedWeatherContextProvider>
        <WeatherForecastCard />
      </MemoizedWeatherContextProvider>,
    );
    expect(screen.getByText("Please Enter Correct City")).toBeInTheDocument();
  });

  test("renders forecast data", () => {
    const mockForecastData = [
      {
        temp: 20,
        icon: "icon-url",
        day: "Monday",
        timeStamp: "2023-07-18 18:00:00",
      },
      {
        temp: 22,
        icon: "icon-url",
        day: "Tuesday",
        timeStamp: "2023-07-19 18:00:00",
      },
      {
        temp: 19,
        icon: "icon-url",
        day: "Wednesday",
        timeStamp: "2023-07-19 18:00:00",
      },
      {
        temp: 25,
        icon: "icon-url",
        day: "Thursday",
        timeStamp: "2023-07-19 18:00:00",
      },
      {
        temp: 32,
        icon: "icon-url",
        day: "Friday",
        timeStamp: "2023-07-19 18:00:00",
      },
    ];

    (useWeatherForecast as jest.Mock).mockReturnValue({
      forecastData: mockForecastData,
      filteredData: mockForecastData,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    render(
      <MemoizedWeatherContextProvider>
        <WeatherForecastCard />
      </MemoizedWeatherContextProvider>,
    );

    const mondayElements = screen.getAllByText("Monday");

    const expectedNumberOfMondays =
      mockForecastData.filter((item) => item.day === "Monday").length * 2;
    expect(mondayElements).toHaveLength(expectedNumberOfMondays);
  });
});

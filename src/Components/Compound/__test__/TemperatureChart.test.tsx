import { render, screen } from "@testing-library/react";
import * as OriginalRecharts from "recharts";
import {
  ThemeContext,
  ThemeProvider,
} from "../../../Context/ThemeChangerContext";
import {
  MemoizedWeatherContextProvider,
  WeatherContext,
  WeatherData,
} from "../../../Context/WeatherContext";
import TemperatureChart from "../TemperatureChart";
import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock("recharts", () => {
  const OriginalModule: typeof OriginalRecharts =
    jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({
      children,
    }: {
      children: JSX.Element;
    }): JSX.Element => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
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
const customTemperatureChartProvider = (): JSX.Element => (
  <WeatherContext.Provider
    value={{
      weatherForecastData: [
        {
          dt_txt: "2024-07-16 12:00:00",
          main: {
            temp: 300,
            humidity: 0,
          },
          sys: {
            pod: "",
          },
          dt: 0,
          wind: {
            speed: 0,
          },
          weather: [{ icon: "" }],
        },
        {
          dt_txt: "2024-07-17 12:00:00",
          main: {
            temp: 305,
            humidity: 0,
          },
          sys: {
            pod: "",
          },
          dt: 0,
          wind: {
            speed: 0,
          },
          weather: [{ icon: "" }],
        },
        {
          dt_txt: "2024-07-18 12:00:00",
          main: {
            temp: 298,
            humidity: 0,
          },
          sys: {
            pod: "",
          },
          dt: 0,
          wind: {
            speed: 0,
          },
          weather: [{ icon: "" }],
        },
      ],
      searchCity: "",
      setSearchCity() {},
      currentWeatherData: mockCurrentWeatherData,
      setCurrentWeatherData() {},
      timeStamp: "",
      settimeStamp() {},
      setWeatherForecastData() {},
      setFavCity() {},
      favCity: [],
      prevSunevent: { sys: { sunrise: 0, sunset: 0 } },
      setPrevsunevent() {},
      isFarenheit: false,
      setIsFarenheit() {},
    }}
  >
    <TemperatureChart />
  </WeatherContext.Provider>
);
describe("TemperatureChart component Tests", () => {
  test("Testing rendering of ui elements", () => {
    render(
      <ThemeProvider>
        <MemoizedWeatherContextProvider>
          <TemperatureChart />
        </MemoizedWeatherContextProvider>
      </ThemeProvider>,
    );
    const temperatureChart = screen.getByTestId("TemperatureChart");
    expect(temperatureChart).toBeInTheDocument();
    const xaxis = document.querySelector("#Xaxis");
    expect(xaxis).not.toBeInTheDocument();
    const yaxis = document.querySelector("#Yaxis");
    expect(yaxis).not.toBeInTheDocument();
  });
  test("Testing UI elements when weatherForecast data is available", () => {
    render(<ThemeProvider>{customTemperatureChartProvider()}</ThemeProvider>);
    const temperatureChart = screen.getByTestId("TemperatureChart");
    expect(temperatureChart).toBeInTheDocument();
    const xaxis = document.querySelector("#Xaxis");
    expect(xaxis).toBeInTheDocument();
    const yaxis = document.querySelector("#Yaxis");
    expect(yaxis).toBeInTheDocument();
  });

  test("Testing Theme Changing Functionality", () => {
    render(
      <ThemeContext.Provider value={{ Darktheme: true, toggleDarkTheme() {} }}>
        {customTemperatureChartProvider()}
      </ThemeContext.Provider>,
    );
    const temperatureChart = screen.getByTestId("TemperatureChart");
    expect(temperatureChart).toBeInTheDocument();
    const xaxis = document.querySelector("#Xaxis");
    expect(xaxis).toBeInTheDocument();
    const yaxis = document.querySelector("#Yaxis");
    expect(yaxis).toBeInTheDocument();
    const cartesianGrid = document.querySelector("#cartesian_grid");
    expect(cartesianGrid).toHaveAttribute("stroke", "rgba(255, 255, 255, 0)");
  });
});

import { useMemo, useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FavCities from "../FavCities";
import "@testing-library/jest-dom";

import {
  MemoizedWeatherContextProvider,
  WeatherContext,
  WeatherData,
} from "../../../Context/WeatherContext";

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
  const [searchCity, setSearchCity] = useState("London");
  const [favCity, setFavCity] = useState<string[]>([]);
  const contextValue = useMemo(
    () => ({
      searchCity,
      setSearchCity,
      favCity,
      setFavCity,
      weatherForecastData: [],
      currentWeatherData: mockCurrentWeatherData,
      setCurrentWeatherData() {},
      timeStamp: "",
      settimeStamp() {},
      setWeatherForecastData() {},
      prevSunevent: { sys: { sunrise: 0, sunset: 0 } },
      setPrevsunevent() {},
      isKelvin: false,
      setIsKelvin() {},
    }),
    [searchCity, favCity],
  );
  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

describe("FavCities component Tests", () => {
  test("adds and removes city from favorites on button click", () => {
    render(
      <CustomWeatherContextProvider>
        <FavCities />
      </CustomWeatherContextProvider>,
    );

    expect(
      screen.getByTestId("FavCity").querySelector("#start_empty"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("FavCity"));

    expect(
      screen.getByTestId("FavCity").querySelector("#start_fill"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("FavCity"));

    expect(
      screen.getByTestId("FavCity").querySelector("#start_empty"),
    ).toBeInTheDocument();
  });
});

test("when no city is searched", () => {
  render(
    <MemoizedWeatherContextProvider>
      <FavCities />
    </MemoizedWeatherContextProvider>,
  );
  const btn = screen.getByTestId("FavCity");
  expect(btn.querySelector("#start_empty")).toBeInTheDocument();
  fireEvent.click(btn);
  expect(btn.querySelector("#start_empty")).toBeInTheDocument();
});

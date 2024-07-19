import { useMemo, useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FavCities from "../FavCities";
import "@testing-library/jest-dom";

import {
  MemoizedWeatherContextProvider,
  WeatherContext,
} from "../../../Context/WeatherContext";

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
    }),
    [searchCity, favCity],
  );
  return (
    <WeatherContext.Provider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      value={contextValue}
    >
      {children}
    </WeatherContext.Provider>
  );
};

describe("FavCities component", () => {
  test("adds and removes city from favorites on button click", () => {
    render(
      <CustomWeatherContextProvider>
        <FavCities />
      </CustomWeatherContextProvider>,
    );

    // Initial state: empty star icon
    expect(
      screen.getByTestId("FavCity").querySelector("#start_empty"),
    ).toBeInTheDocument();

    // Click to add city to favorites
    fireEvent.click(screen.getByTestId("FavCity"));

    // State after adding: filled star icon
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

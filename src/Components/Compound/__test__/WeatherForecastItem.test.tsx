import { fireEvent, render, screen } from "@testing-library/react";
import { useMemo, useState } from "react";
import "@testing-library/jest-dom";
import {
  MemoizedWeatherContextProvider,
  WeatherContext,
  WeatherData,
} from "../../../Context/WeatherContext";
import WeatherForecastItem from "../WeatherForecastItem";

const mockItem = {
  temp: 20,
  icon: "icon-url",
  day: "Monday",
  timeStamp: "2023-07-18 18:00:00",
};

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

describe("WeatherForecastItem component Tests", () => {
  test("Onclick and onKeyDown toggles timestamp", () => {
    const settimeStampMock = jest.fn();

    const Wrapper = ({ children }: { children: JSX.Element }): JSX.Element => {
      const [timeStamp, setTimeStamp] = useState("");
      const contextValue = useMemo(
        () => ({
          searchCity: "",
          setSearchCity() {},
          favCity: [],
          setFavCity() {},
          timeStamp,
          settimeStamp: (newTimeStamp: string) => {
            setTimeStamp(newTimeStamp);
            settimeStampMock(newTimeStamp);
          },
          weatherForecastData: [],
          currentWeatherData: mockCurrentWeatherData,
          setCurrentWeatherData() {},
          setWeatherForecastData() {},
          prevSunevent: { sys: { sunrise: 0, sunset: 0 } },
          setPrevsunevent() {},
          isFarenheit: false,
          setIsFarenheit() {},
        }),
        [timeStamp],
      );
      return (
        <WeatherContext.Provider value={contextValue}>
          {children}
        </WeatherContext.Provider>
      );
    };

    render(
      <Wrapper>
        <WeatherForecastItem item={mockItem} animation />
      </Wrapper>,
    );

    const weatherForecastItem = screen.getByTestId("WeatherForecastItem");

    fireEvent.click(weatherForecastItem);
    expect(settimeStampMock).toHaveBeenCalledWith(mockItem.timeStamp);

    fireEvent.click(weatherForecastItem);
    expect(settimeStampMock).toHaveBeenCalledWith("");

    fireEvent.keyDown(weatherForecastItem, { key: "Enter", code: "Enter" });
    expect(settimeStampMock).toHaveBeenCalledWith(mockItem.timeStamp);

    fireEvent.keyDown(weatherForecastItem, { key: "Enter", code: "Enter" });
    expect(settimeStampMock).toHaveBeenCalledWith("");

    fireEvent.keyDown(weatherForecastItem, { key: " ", code: "Space" });
    expect(settimeStampMock).toHaveBeenCalledWith(mockItem.timeStamp);

    fireEvent.keyDown(weatherForecastItem, { key: " ", code: "Space" });
    expect(settimeStampMock).toHaveBeenCalledWith("");
  });

  test("testing assignation of classes when animation is false ", () => {
    render(
      <MemoizedWeatherContextProvider>
        <WeatherForecastItem item={mockItem} animation={false} />
      </MemoizedWeatherContextProvider>,
    );
    const weatherForecastItem = screen.getByTestId("WeatherForecastItem");
    expect(weatherForecastItem).not.toHaveClass(
      "hover:-translate-y-3 duration-200",
    );
  });
  test("testing assignation of classes when animation is true ", () => {
    render(
      <MemoizedWeatherContextProvider>
        <WeatherForecastItem item={mockItem} animation />
      </MemoizedWeatherContextProvider>,
    );
    const weatherForecastItem = screen.getByTestId("WeatherForecastItem");
    expect(weatherForecastItem).toHaveClass(
      "hover:-translate-y-3 duration-200",
    );
  });
});

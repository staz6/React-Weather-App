import { fireEvent, render, screen } from "@testing-library/react";
import { useMemo, useState } from "react";
import "@testing-library/jest-dom";
import {
  MemoizedWeatherContextProvider,
  WeatherContext,
} from "../../../Context/WeatherContext";
import WeatherForecastItem from "../WeatherForecastItem";

const mockItem = {
  temp: 20,
  icon: "icon-url",
  day: "Monday",
  timeStamp: "2023-07-18 18:00:00",
};

test("Onclick and onKeyDown toggles timestamp", () => {
  const settimeStampMock = jest.fn();

  const Wrapper = ({ children }: { children: JSX.Element }): JSX.Element => {
    const [timeStamp, setTimeStamp] = useState("");
    const contextValue = useMemo(
      () => ({
        timeStamp,
        settimeStamp: (newTimeStamp: string) => {
          setTimeStamp(newTimeStamp);
          settimeStampMock(newTimeStamp);
        },
      }),
      [timeStamp],
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
  expect(weatherForecastItem).toHaveClass("hover:-translate-y-3 duration-200");
});

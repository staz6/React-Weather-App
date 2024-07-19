import { render, screen } from "@testing-library/react";
import LazyCurrentWeatherCard from "../LazyCurrentWeatherCard";
import "@testing-library/jest-dom";

test("Testing rendering of UI elements", () => {
  render(<LazyCurrentWeatherCard />);
  const LoadingText = screen.getByText("Loading CurrentWeather");
  expect(LoadingText).toBeInTheDocument();
});

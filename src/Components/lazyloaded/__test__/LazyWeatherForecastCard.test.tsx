import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LazyWeatherForecastCard from "../LazyWeatherForecastCard";

describe("LazyWeatherForecastCard Component Tests", () => {
  test("Testing rendering of UI elements", () => {
    render(<LazyWeatherForecastCard />);
    const loadingText = screen.getByText("Loading Forecast");
    expect(loadingText).toBeInTheDocument();
  });
});

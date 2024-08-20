import { render, screen } from "@testing-library/react";
import WeatherMetricsCard from "../WeahterMetricsCard";
import "@testing-library/jest-dom";
import { MemoizedWeatherContextProvider } from "../../../Context/WeatherContext";

jest.mock("../../../HelperFunctions/CalculateWeatherMetrics", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => [
    { value: 25, unit: "km/h" },
    { value: 60, unit: "%" },
    { value: 0, unit: "mm" },
  ]),
}));

describe("WeatherMetricsCard component Tests", () => {
  it("renders weather metrics correctly and displays NA if data not available", () => {
    render(
      <MemoizedWeatherContextProvider>
        <WeatherMetricsCard />
      </MemoizedWeatherContextProvider>,
    );
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
    expect(screen.getByText("NA")).toBeInTheDocument();
    expect(screen.getByText("Hum")).toBeInTheDocument();
    expect(screen.getByText("Wind")).toBeInTheDocument();
    expect(screen.getByText("Rain")).toBeInTheDocument();
    expect(screen.getByText("mm")).toBeInTheDocument();
    expect(screen.getByText("%")).toBeInTheDocument();
    expect(screen.getByText("km/h")).toBeInTheDocument();
  });
});

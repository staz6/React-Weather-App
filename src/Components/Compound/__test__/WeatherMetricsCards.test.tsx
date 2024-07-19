import { render, screen } from "@testing-library/react";
import WeatherMetricsCard from "../WeahterMetricsCard";
import "@testing-library/jest-dom";
import { MemoizedWeatherContextProvider } from "../../../Context/WeatherContext";

jest.mock("../../../HelperFunctions/CalculateWeatherMetrics", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => [
    { Icon: () => <div>Icon1</div>, value: 25, unit: "km/h" },
    { Icon: () => <div>Icon2</div>, value: 60, unit: "%" },
    { Icon: () => <div>Icon3</div>, value: 0, unit: "mm" },
  ]),
}));

describe("WeatherMetricsCard component", () => {
  it("renders weather metrics correctly and displays NA if data not available", () => {
    render(
      <MemoizedWeatherContextProvider>
        <WeatherMetricsCard />
      </MemoizedWeatherContextProvider>,
    );
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
    expect(screen.getByText("NA")).toBeInTheDocument();
    expect(screen.getByText("Icon1")).toBeInTheDocument();
    expect(screen.getByText("Icon2")).toBeInTheDocument();
    expect(screen.getByText("Icon3")).toBeInTheDocument();
    expect(screen.getByText("mm")).toBeInTheDocument();
    expect(screen.getByText("%")).toBeInTheDocument();
    expect(screen.getByText("km/h")).toBeInTheDocument();
  });
});

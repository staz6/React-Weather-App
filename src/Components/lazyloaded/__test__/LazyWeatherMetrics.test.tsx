import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LazyWeatherMetrics from "../LazyWeatherMetrics";

describe("LazyWeatherMetrics Component Tests", () => {
  test("Testing rendering of UI elements", () => {
    render(<LazyWeatherMetrics />);
    const loadingText = screen.getByText("loading weather metrics");
    expect(loadingText).toBeInTheDocument();
  });
});

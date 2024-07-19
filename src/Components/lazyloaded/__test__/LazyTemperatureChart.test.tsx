import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LazyTemperatureChart from "../LazyTemperatureChart";

test("Testing rendering of UI elements", () => {
  render(<LazyTemperatureChart />);
  const loadingText = screen.getByText("Loading Temperature Chart");
  expect(loadingText).toBeInTheDocument();
});

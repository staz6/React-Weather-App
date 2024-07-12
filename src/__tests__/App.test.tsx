import React from "react";
import { render } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

jest.mock("../Components/Layout/Layout", () => {
  const MockedLayout: React.FC = () => (
    <div data-testid="layout">Mocked Layout</div>
  );
  MockedLayout.displayName = "MockedLayout";
  return MockedLayout;
});
jest.mock("../Context/WeatherContext", () => ({
  MemoizedWeatherContextProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div data-testid="weather-context">{children}</div>,
}));
jest.mock("../Context/ThemeChangerContext", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

describe("App component", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(
      document.querySelector('[data-testid="layout"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-testid="weather-context"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-testid="theme-provider"]'),
    ).toBeInTheDocument();
  });
});

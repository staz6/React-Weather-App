import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherAlert from "../WeatherAlert";
import { ThemeProvider } from "../../../Context/ThemeChangerContext";
import { MemoizedWeatherContextProvider } from "../../../Context/WeatherContext";
import "@testing-library/jest-dom";
import useWeatherAlert from "../../../CustomeHooks/WeatherAlertHook";

const queryClient = new QueryClient();
jest.mock("../../../CustomeHooks/WeatherAlertHook");

test("Testing weather alert notification when no notification available", () => {
  (useWeatherAlert as jest.Mock).mockReturnValue({
    isLoading: false,
    isError: false,
    data: {
      alerts: {
        alert: [],
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoizedWeatherContextProvider>
          <WeatherAlert />
        </MemoizedWeatherContextProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
  const WeatherAlertComponent = screen.getByTestId("weatherAlert_component");
  expect(WeatherAlertComponent).toBeInTheDocument();
  const BellBtn = screen.getByTestId("bell_btn");
  expect(BellBtn).toBeInTheDocument();
  fireEvent.click(BellBtn);
  const notfication = screen.getByText("No notifications");
  expect(notfication).toBeInTheDocument();
});

test("Testing weather alert notification when notification available on onclick and useffect", async () => {
  (useWeatherAlert as jest.Mock).mockReturnValue({
    isLoading: false,
    isError: false,
    data: {
      alerts: {
        alert: [
          {
            category: "Temperature",
            headline: "Hot temperature",
            desc: "Stay home",
          },
        ],
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoizedWeatherContextProvider>
          <WeatherAlert />
        </MemoizedWeatherContextProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
  await waitFor(() => {
    const notfication = screen.getByTestId("auto_notify");
    expect(notfication).toBeInTheDocument();
  });
  const BellBtn = screen.getByTestId("bell_btn");
  expect(BellBtn).toBeInTheDocument();
  fireEvent.click(BellBtn);
  await waitFor(() => {
    const notfication = screen.getByTestId("manual_notify");
    expect(notfication).toBeInTheDocument();
  });
});

test("Testing weather alert error ", async () => {
  (useWeatherAlert as jest.Mock).mockReturnValue({
    isLoading: false,
    isError: true,
    data: {},
  });

  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoizedWeatherContextProvider>
          <WeatherAlert />
        </MemoizedWeatherContextProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );

  await waitFor(() => {
    const error = screen.getByTestId("weatherAlert_error");
    expect(error).toBeInTheDocument();
  });
});

test("Testing weather alert notification when no notification available", () => {
  jest.mock("../../../CustomeHooks/WeatherAlertHook.tsx");
  (useWeatherAlert as jest.Mock).mockReturnValue({
    isLoading: false,
    isError: false,
    data: {
      alerts: {
        alert: [],
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoizedWeatherContextProvider>
          <WeatherAlert />
        </MemoizedWeatherContextProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
  const WeatherAlertComponent = screen.getByTestId("weatherAlert_component");
  expect(WeatherAlertComponent).toBeInTheDocument();
  const BellBtn = screen.getByTestId("bell_btn");
  expect(BellBtn).toBeInTheDocument();
  fireEvent.click(BellBtn);
  const notfication = screen.getByText("No notifications");
  expect(notfication).toBeInTheDocument();
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "../../../Context/ThemeChangerContext";
import CurrentLocation from "../CurrentLocation";
import { MemoizedWeatherContextProvider } from "../../../Context/WeatherContext";

interface MockGeolocation {
  getCurrentPosition: jest.Mock;
}
interface MockedResponse {
  name: string;
}
const mockGeolocation: MockGeolocation = {
  getCurrentPosition: jest.fn(),
};

const mockFetch = (response: MockedResponse): void => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
    }),
  );
};

const queryClient = new QueryClient();

const renderCurrentLocation = (): void => {
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoizedWeatherContextProvider>
          <CurrentLocation />
        </MemoizedWeatherContextProvider>
      </ThemeProvider>
    </QueryClientProvider>,
  );
};

beforeAll(() => {
  window.alert = jest.fn();
});

beforeEach(() => {
  Object.defineProperty(global.navigator, "geolocation", {
    value: mockGeolocation,
    writable: true,
  });
});

describe("CurrentLocation Component Tests", () => {
  test("should prompt user for allowing location", async () => {
    const mockedResponse = {
      name: "London",
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (success: PositionCallback) =>
        success({
          coords: {
            latitude: 51.5074,
            longitude: -0.1278,
            accuracy: 0,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        }),
    );

    mockFetch(mockedResponse);

    renderCurrentLocation();

    const locationBtn = screen.getByTestId("location_btn");
    expect(locationBtn).toBeInTheDocument();

    fireEvent.click(locationBtn);

    await waitFor(() =>
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled(),
    );
  });

  test("should handle geolocation permission denied", async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (_: PositionCallback, error: PositionErrorCallback) =>
        error({
          code: 1,
          PERMISSION_DENIED: 1,
          message:
            "Geolocation is not enabled or not supported by this browser.",
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        }),
    );

    renderCurrentLocation();

    const locationBtn = screen.getByTestId("location_btn");
    fireEvent.click(locationBtn);

    await waitFor(() =>
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled(),
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Geolocation is not enabled or not supported by this browser.",
    );
  });
});

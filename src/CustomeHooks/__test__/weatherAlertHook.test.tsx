import { waitFor, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useWeatherAlert, { WeatherApiResponse } from "../WeatherAlertHook";

const queryClient = new QueryClient();

const mockFetch = (
  response: WeatherApiResponse,
  isError: boolean = false,
): void => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: !isError,
      json: () => Promise.resolve(response),
    }),
  );
};

describe("useWeatherAlert Hook Tests", () => {
  test("useWeatherAlert hook fetches data correctly with valid city", async () => {
    const mockResponse: WeatherApiResponse = {
      alerts: {
        alert: [
          {
            category: "Wind",
            headline: "Strong winds",
            desc: "Secure loose objects",
          },
        ],
      },
    };

    mockFetch(mockResponse);

    const { result } = renderHook(
      () => useWeatherAlert({ searchCity: "New York" }),
      {
        wrapper: ({ children }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.isError).toBe(false);
  });
});

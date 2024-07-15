import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCityNameFetch from "../CustomeHooks/CurrentLocationHook";

const queryClient = new QueryClient();

const mockFetch = (response: { name: string }): void => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
    }),
  );
};

test("Testing Current location hook with mock lat and lon values", async () => {
  const mockedResponse = {
    name: "London", // The response structure should match what the actual API returns
  };
  mockFetch(mockedResponse);
  const { result } = renderHook(
    () => useCityNameFetch({ lat: 24.06, lon: 24.06 }),
    {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    },
  );
  await waitFor(() => expect(result.current.isLoading).toBe(false));
  expect(result.current.cityName).toEqual(mockedResponse.name);
});

import { render, screen } from "@testing-library/react";
import SuneventCard from "../Components/Compound/SuneventCard";
import "@testing-library/jest-dom";
import {
  useWeatherContext,
  WeatherContextProps,
} from "../Context/WeatherContext";

jest.mock("../Context/WeatherContext", () => ({
  useWeatherContext: jest.fn(),
}));

jest.mock("../HelperFunctions/suneventtimes", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => [
    { name: "Sunrise", ampm: "5:00 AM", militaryTime: "05:00" },
    { name: "Golden Hour", ampm: "6:00 AM", militaryTime: "06:00" },
    { name: "Sunset", ampm: "8:00 PM", militaryTime: "20:00" },
  ]),
}));

jest.mock("../Components/Compound/SunEvent", () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockImplementation(
      ({
        event,
        id,
      }: {
        event: { name: string; ampm: string; militaryTime: string };
        id: number;
      }) => (
        <div data-testid={`sun-event-${id}`}>
          <span>{event.name}</span>
          <span>{event.ampm}</span>
          <span>{event.militaryTime}</span>
        </div>
      ),
    ),
}));

describe("SuneventCard component", () => {
  it("renders sun event data correctly", () => {
    const mockUseWeatherContext = useWeatherContext as jest.MockedFunction<
      typeof useWeatherContext
    >;

    const mockWeatherData: Partial<WeatherContextProps> = {
      currentWeatherData: {
        sys: {
          sunrise: 1623315600,
          sunset: 1623362400,
        },
        main: {
          temp: 0,
          humidity: 0,
        },
        dt: 0,
        weather: [],
        wind: { speed: 0 },
      },
    };

    mockUseWeatherContext.mockReturnValue(
      mockWeatherData as WeatherContextProps,
    );

    render(<SuneventCard />);

    expect(screen.getByText("Sunrise")).toBeInTheDocument();
    expect(screen.getByText("5:00 AM")).toBeInTheDocument();
    expect(screen.getByText("05:00")).toBeInTheDocument();
    expect(screen.getByText("Golden Hour")).toBeInTheDocument();
    expect(screen.getByText("6:00 AM")).toBeInTheDocument();
    expect(screen.getByText("06:00")).toBeInTheDocument();
    expect(screen.getByText("Sunset")).toBeInTheDocument();
    expect(screen.getByText("8:00 PM")).toBeInTheDocument();
    expect(screen.getByText("20:00")).toBeInTheDocument();

    expect(screen.getByTestId("sun-event-0")).toBeInTheDocument();
    expect(screen.getByTestId("sun-event-1")).toBeInTheDocument();
    expect(screen.getByTestId("sun-event-2")).toBeInTheDocument();
  });

  it("does not render sun event data when currentWeatherData is missing", () => {
    const mockUseWeatherContext = useWeatherContext as jest.MockedFunction<
      typeof useWeatherContext
    >;

    mockUseWeatherContext.mockReturnValue({
      currentWeatherData: null,
    } as WeatherContextProps);

    render(<SuneventCard />);

    expect(screen.queryByText("Sunrise")).not.toBeInTheDocument();
    expect(screen.queryByText("5:00 AM")).not.toBeInTheDocument();
    expect(screen.queryByText("05:00")).not.toBeInTheDocument();
    expect(screen.queryByText("Golden Hour")).not.toBeInTheDocument();
    expect(screen.queryByText("6:00 AM")).not.toBeInTheDocument();
    expect(screen.queryByText("06:00")).not.toBeInTheDocument();
    expect(screen.queryByText("Sunset")).not.toBeInTheDocument();
    expect(screen.queryByText("8:00 PM")).not.toBeInTheDocument();
    expect(screen.queryByText("20:00")).not.toBeInTheDocument();
  });
});

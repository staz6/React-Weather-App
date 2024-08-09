import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import KelvinCelciusConverter from "../KelvinCelciusConverter";
import { useWeatherContext } from "../../../Context/WeatherContext";

// Mock the useWeatherContext hook
jest.mock("../../../Context/WeatherContext", () => ({
  useWeatherContext: jest.fn(),
}));

describe("KelvinCelciusConverter Component Tests", () => {
  it("renders correctly with Kelvin selected", () => {
    const mockSetIsKelvin = jest.fn();
    (useWeatherContext as jest.Mock).mockReturnValue({
      isKelvin: true,
      setIsKelvin: mockSetIsKelvin,
    });

    render(<KelvinCelciusConverter />);

    expect(screen.getByText("F")).toHaveClass("bg-white bg-opacity-25");
    expect(screen.getByText("C")).not.toHaveClass("bg-white bg-opacity-25");
  });

  it("renders correctly with Celsius selected ", () => {
    const mockSetIsKelvin = jest.fn();
    (useWeatherContext as jest.Mock).mockReturnValue({
      isKelvin: false,
      setIsKelvin: mockSetIsKelvin,
    });

    render(<KelvinCelciusConverter />);

    expect(screen.getByText("F")).not.toHaveClass("bg-white bg-opacity-25");
    expect(screen.getByText("C")).toHaveClass("bg-white bg-opacity-25");
  });

  it("calls setIsKelvin  when button is clicked", () => {
    const mockSetIsKelvin = jest.fn();
    (useWeatherContext as jest.Mock).mockReturnValue({
      isKelvin: true,
      setIsKelvin: mockSetIsKelvin,
    });
    render(<KelvinCelciusConverter />);

    const button = screen.getByTestId("TempConverter");
    fireEvent.click(button);
    expect(mockSetIsKelvin).toHaveBeenCalledTimes(1);
    fireEvent.click(button);
    expect(mockSetIsKelvin).toHaveBeenCalledTimes(2);
  });
});

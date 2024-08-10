import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FarenheitCelciusConverter from "../FarenheitCelciusConverter";
import { useWeatherContext } from "../../../Context/WeatherContext";

// Mock the useWeatherContext hook
jest.mock("../../../Context/WeatherContext", () => ({
  useWeatherContext: jest.fn(),
}));

describe("FarenheitCelciusConverter Component Tests", () => {
  it("testing slider animation and background color when celcius and kelvin is selected", () => {
    const mockSetIsKelvin = jest.fn();
    (useWeatherContext as jest.Mock).mockReturnValue({
      isKelvin: true,
      setIsKelvin: mockSetIsKelvin,
    });

    render(<FarenheitCelciusConverter />);
    expect(screen.getByTestId("tempSlider")).toHaveClass(
      "left-[calc(100%-3.5rem)]",
    );
  });

  it("renders correctly with Celsius selected", () => {
    const mockSetIsKelvin = jest.fn();
    (useWeatherContext as jest.Mock).mockReturnValue({
      isKelvin: false,
      setIsKelvin: mockSetIsKelvin,
    });

    render(<FarenheitCelciusConverter />);
    expect(screen.getByTestId("tempSlider")).toHaveClass("left-0");
  });

  it("calls setIsKelvin  when button is clicked", () => {
    const mockSetIsKelvin = jest.fn();
    (useWeatherContext as jest.Mock).mockReturnValue({
      isKelvin: true,
      setIsKelvin: mockSetIsKelvin,
    });
    render(<FarenheitCelciusConverter />);

    const button = screen.getByTestId("TempConverter");
    fireEvent.click(button);
    expect(mockSetIsKelvin).toHaveBeenCalledTimes(1);
    fireEvent.click(button);
    expect(mockSetIsKelvin).toHaveBeenCalledTimes(2);
  });
});

import { render, screen } from "@testing-library/react";
import SimpleSlider from "../Slider";
import "@testing-library/jest-dom";

jest.mock("react-slick", () => ({
  __esModule: true,
  default: ({ children }: { children: JSX.Element }): JSX.Element => (
    <div data-testid="slider">{children}</div>
  ),
}));

const mockSliderData = [
  {
    day: "Mon",
    temp: 27,
  },
  {
    day: "Tue",
    temp: 30,
  },
  {
    day: "Wed",
    temp: 20,
  },
];

describe("SimpleSlider component", () => {
  it("renders the slider with the correct children", () => {
    render(
      <SimpleSlider>
        {mockSliderData.map((data, index) => (
          <div key={index} data-testid={`slide-${index}`}>
            {data.day} - {data.temp}°C
          </div>
        ))}
      </SimpleSlider>,
    );

    expect(screen.getByTestId("slider")).toBeInTheDocument();
    mockSliderData.forEach((data, index) => {
      expect(screen.getByTestId(`slide-${index}`)).toHaveTextContent(
        `${data.day} - ${data.temp}°C`,
      );
    });
  });
});

import { render, screen } from "@testing-library/react";
import SunEvent from "../SunEvent";
import "@testing-library/jest-dom";

jest.mock("../../../assets/Group 657 (1).png", () => "mock-image-path.png");

describe("SunEvent Component Tests", () => {
  const mockEvent = {
    name: "Golden Hour",
    ampm: "5:00 AM",
    militaryTime: "05:00",
  };

  it("renders event name and time  correctly", () => {
    render(<SunEvent id={1} event={mockEvent} />);
    const eventName = screen.getByText("Golden Hour");
    expect(eventName).toBeInTheDocument();
    const eventTime = screen.getByText("5:00");
    expect(eventTime).toBeInTheDocument();
    const militaryTime = screen.getByText("05:00");
    expect(militaryTime).toBeInTheDocument();
  });

  it("assign correct classes if id = 1", () => {
    render(<SunEvent id={1} event={mockEvent} />);
    const event = screen.getByText("Golden Hour");
    expect(event).toBeInTheDocument();
    expect(event).toHaveClass("text-xl");
  });
  it("assign correct classes if is not equal to 1", () => {
    render(<SunEvent id={2} event={mockEvent} />);
    const event = screen.getByText("Golden Hour");
    expect(event).toBeInTheDocument();
    expect(event).toHaveClass("text-lg");
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LazySuneventCard from "../LazySuneventCard";

test("testing rendering of UI elements", () => {
  render(<LazySuneventCard />);
  const sunrise = screen.getByText("Sunrise");
  expect(sunrise).toBeInTheDocument();
  const sunset = screen.getByText("Sunset");
  expect(sunset).toBeInTheDocument();
  const goldenHour = screen.getByText("Golden Hour");
  expect(goldenHour).toBeInTheDocument();
});

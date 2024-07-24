import { fireEvent, render, screen } from "@testing-library/react";
import ThemeChanger from "../ThemeChanger";
import {
  ThemeContext,
  ThemeProvider,
} from "../../../Context/ThemeChangerContext";
import "@testing-library/jest-dom";

describe("ThemeChanger Component Tests", () => {
  test("Testing rendering of UI elements", () => {
    render(
      <ThemeProvider>
        <ThemeChanger />
      </ThemeProvider>,
    );
    const btn = screen.getByTestId("ThemeChanger");
    expect(btn).toBeInTheDocument();
    const SunIcon = btn.querySelector("#BiSun");
    const MoonIcon = btn.querySelector("#FaMoon");
    expect(SunIcon).toBeInTheDocument();
    expect(MoonIcon).toHaveClass("bg-transparent");
  });
  test("Testing Theme Changing Functionality on clicking of Themechanger", () => {
    const mockToggleDarkTheme = jest.fn();
    render(
      <ThemeContext.Provider
        value={{ Darktheme: true, toggleDarkTheme: mockToggleDarkTheme }}
      >
        <ThemeChanger />
      </ThemeContext.Provider>,
    );
    const btn = screen.getByTestId("ThemeChanger");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(mockToggleDarkTheme).toHaveBeenCalledTimes(1);
  });

  test("Testing appending of dark tailwind class in html ", () => {
    render(
      <ThemeProvider>
        <ThemeChanger />
      </ThemeProvider>,
    );
    const btn = screen.getByTestId("ThemeChanger");
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    const htmlElement = document.querySelector("html");
    expect(htmlElement).toHaveClass("dark");
    fireEvent.click(btn);
    expect(htmlElement).not.toHaveClass("dark");
  });
});

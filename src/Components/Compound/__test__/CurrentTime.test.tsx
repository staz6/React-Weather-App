import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import dayjs from "dayjs";
import CurrentTime from "../CurrentTime";

jest.useFakeTimers();

describe("CurrentTime component", () => {
  test("renders with initial time", () => {
    const initialTime = dayjs().format("h:mm A");
    render(<CurrentTime className="test-class" />);
    const timeElement = screen.getByText(initialTime);
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveClass("test-class");
  });

  test("updates the time every minute", () => {
    const fixedTime = new Date(2023, 6, 15, 10, 30);
    jest.spyOn(global, "Date").mockImplementation(() => fixedTime);

    render(<CurrentTime className="test-class" />);

    const initialTime = dayjs(fixedTime).format("h:mm A");
    expect(screen.getByText(initialTime)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    const updatedTime = dayjs(fixedTime).add(1, "minute").format("h:mm A");

    act(() => {});

    const updatedTimeElement = screen.getByText(updatedTime);
    expect(updatedTimeElement).toBeInTheDocument();
    expect(updatedTimeElement).toHaveClass("test-class");
  });

  test("clears interval on component unmount", () => {
    const { unmount } = render(<CurrentTime className="test-class" />);
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });
});

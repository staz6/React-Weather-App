import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Shared/Button"; // Adjust the import path as per your project structure

describe("Button Component", () => {
  it("renders button correctly with description and icon", () => {
    const onClickMock = jest.fn();

    const { getByText } = render(
      <Button
        onClick={onClickMock}
        icon={<span>Icon</span>}
        className="test-class"
        description="Button Description"
        testid="button-testid"
      />,
    );

    expect(getByText("Button Description")).toBeInTheDocument();
    expect(getByText("Icon")).toBeInTheDocument();
  });

  it("calls onClick handler when button is clicked", () => {
    const onClickMock = jest.fn();

    const { getByTestId } = render(
      <Button
        onClick={onClickMock}
        icon={<span>Icon</span>}
        className="test-class"
        description="Button Description"
        testid="button-testid"
      />,
    );

    fireEvent.click(getByTestId("button-testid"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders button correctly without description and with children", () => {
    const onClickMock = jest.fn();

    const { getByText } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <Button
        onClick={onClickMock}
        icon={<span>Icon</span>}
        className="test-class"
        testid="button-testid"
      >
        Children Content
      </Button>,
    );

    expect(getByText("Children Content")).toBeInTheDocument();
    expect(getByText("Icon")).toBeInTheDocument();
  });

  it("renders button with default className when className is not provided", () => {
    const onClickMock = jest.fn();

    const { getByTestId } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <Button
        onClick={onClickMock}
        icon={<span>Icon</span>}
        description="Button Description"
        testid="button-testid"
      />,
    );

    const buttonElement = getByTestId("button-testid");
    expect(buttonElement).toHaveAttribute("class", ""); // Ensure default className is applied
  });

  it("renders button without description when description is not provided", () => {
    const onClickMock = jest.fn();

    const { queryByText } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <Button
        onClick={onClickMock}
        icon={<span>Icon</span>}
        className="test-class"
        testid="button-testid"
      />,
    );

    const descriptionElement = queryByText("Button Description");
    expect(descriptionElement).not.toBeInTheDocument();
  });
});

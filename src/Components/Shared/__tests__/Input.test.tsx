import { render, fireEvent, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import Input from "../Input";

describe("Input Component", () => {
  const onChangeMock = jest.fn();
  const onClickMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders input correctly and triggers onChange handler", async () => {
    const { getByPlaceholderText } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <Input
        type="text"
        placeholder="Enter text"
        value=""
        onChange={onChangeMock}
        className="test-input"
      />,
    );

    const inputElement = getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "Test Input" } });
    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith("Test Input");
    });
  });
  it("renders input with default props", () => {
    const { getByPlaceholderText } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <Input
        type="text"
        placeholder="Enter text"
        value=""
        onChange={onChangeMock}
      />,
    );

    const inputElement = getByPlaceholderText("Enter text") as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.className).toBe("");
    expect(inputElement.value).toBe("");
  });

  it("handles different value types correctly", () => {
    render(
      <div>
        <Input
          type="text"
          placeholder="Enter text"
          value="Text Value"
          onChange={onChangeMock}
          className="test-input"
          onClick={onClickMock}
        />
        <Input
          type="number"
          placeholder="Enter number"
          value={123}
          onChange={onChangeMock}
          className="test-input"
          onClick={onClickMock}
        />
        <Input
          type="text"
          placeholder="Enter text array"
          value={["Value1", "Value2"]}
          onChange={onChangeMock}
          className="test-input"
          onClick={onClickMock}
        />
        <Input
          type="text"
          placeholder="Enter undefined"
          value={undefined}
          onChange={onChangeMock}
          className="test-input"
          onClick={onClickMock}
        />
      </div>,
    );
  });

  it("handles onClick prop correctly", () => {
    const { getByPlaceholderText } = render(
      <Input
        type="text"
        placeholder="Enter text"
        value=""
        onChange={onChangeMock}
        className="test-input"
        onClick={onClickMock}
      />,
    );

    const inputElement = getByPlaceholderText("Enter text");
    fireEvent.click(inputElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

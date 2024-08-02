/* eslint-disable no-console */
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input, { InputProps } from "../Components/Shared/Input";

type InputPropsAndArgs = InputProps<string>;

const InputWrapper: React.FC<InputPropsAndArgs> = ({
  value,
  onChange,
  onClick,
  ...args
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (newValue: string): void => {
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...args}
      value={inputValue}
      onChange={handleChange}
      onClick={onClick}
    />
  );
};

const meta: Meta<InputPropsAndArgs> = {
  title: "Components/Input",
  component: InputWrapper,
};

export default meta;

type Story = StoryObj<InputPropsAndArgs>;

export const InputBar: Story = {
  args: {
    type: "text",
    className: "border border-zinc-700",
    placeholder: "Enter city name",
    value: "",
    onChange: action(""),
    onClick: action("Input element Click"),
  },
};

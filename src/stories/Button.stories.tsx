import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { BsTrophyFill } from "react-icons/bs";
import Button from "../Components/Shared/Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    onClick: action("Button Click"),
    icon: <BsTrophyFill />,
    className: "bg-red-500  p-2 flex place-items-center gap-2",
    description: "click",
    children: "me",
    testid: "primary-button",
  },
};

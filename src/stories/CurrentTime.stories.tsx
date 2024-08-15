import type { Meta, StoryObj } from "@storybook/react";
import CurrentTime from "../Components/Compound/CurrentTime";

const meta: Meta<typeof CurrentTime> = {
  component: CurrentTime,
};

export default meta;
type Story = StoryObj<typeof CurrentTime>;

export const Currenttime: Story = {
  args: {
    className: "bg-linearSide text-white",
  },
};

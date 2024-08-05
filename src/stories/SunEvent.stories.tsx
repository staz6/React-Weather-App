import type { Meta, StoryObj } from "@storybook/react";
import SunEvent from "../Components/Compound/SunEvent";

const meta: Meta<typeof SunEvent> = {
  component: SunEvent,
  decorators: [
    (Story) => (
      <div className="bg-linearMainDark w-fit h-fit pt-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SunEvent>;

export const Sunrise: Story = {
  args: {
    id: 0,
    event: {
      name: "Sunrise",
      ampm: "10:00 AM",
      militaryTime: "10:00",
    },
  },
};
export const GoldenHour: Story = {
  args: {
    id: 1,
    event: {
      name: "Golden Hour",
      ampm: "12:00 PM",
      militaryTime: "12:00",
    },
  },
};

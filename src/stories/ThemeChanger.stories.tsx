import type { Meta, StoryObj } from "@storybook/react";
import ThemeChanger from "../Components/Compound/ThemeChanger";
import { ThemeProvider } from "../Context/ThemeChangerContext";

const meta: Meta<typeof ThemeChanger> = {
  title: "Components/ThemeChanger",
  component: ThemeChanger,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="bg-linearBg h-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemeChanger>;

export const Default: Story = {};

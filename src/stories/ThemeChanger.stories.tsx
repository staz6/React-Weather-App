import type { Meta, StoryObj } from "@storybook/react";
import ThemeChanger from "../Components/Compound/ThemeChanger";
import { ThemeProvider } from "../Context/ThemeChangerContext";

const meta: Meta<typeof ThemeChanger> = {
  title: "Components/ThemeChanger",
  component: ThemeChanger,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="bg-linearMain dark:bg-linearMainDark p-4 min-h-screen flex justify-center items-center">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ThemeChanger>;

export const Default: Story = {};

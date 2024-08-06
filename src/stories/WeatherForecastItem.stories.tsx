import type { Meta, StoryObj } from "@storybook/react";
import WeatherForecastItem from "../Components/Compound/WeatherForecastItem";
import { MemoizedWeatherContextProvider } from "../Context/WeatherContext";

const meta: Meta<typeof WeatherForecastItem> = {
  component: WeatherForecastItem,
  decorators: [
    (Story) => (
      <MemoizedWeatherContextProvider>
        <Story />
      </MemoizedWeatherContextProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WeatherForecastItem>;

export const First: Story = {
  args: {
    item: {
      temp: 27,
      icon: "https://i.pinimg.com/564x/73/60/fc/7360fcf6fd40842cad410f8d147d1f8b.jpg",
      day: "Mon",
      timeStamp: "20",
    },
    animation: true,
  },
};
export const Second: Story = {
  args: {
    item: {
      temp: 20,
      icon: "https://i.pinimg.com/564x/73/60/fc/7360fcf6fd40842cad410f8d147d1f8b.jpg",
      day: "Tue",
      timeStamp: "20",
    },
    animation: false,
  },
};

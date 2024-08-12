import React from "react";
import { action } from "@storybook/addon-actions";
import { useWeatherContext } from "../../Context/WeatherContext";

interface Props {
  item: {
    temp: number;
    icon: string;
    day: string;
    timeStamp: string;
  };
  animation: boolean | undefined;
}

const WeatherForecastItem: React.FC<Props> = ({ item, animation = true }) => {
  const { settimeStamp, timeStamp } = useWeatherContext();
  return (
    <div
      data-testid="WeatherForecastItem"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          settimeStamp(item.timeStamp);
        }
      }}
      onClick={() =>
        timeStamp === item.timeStamp
          ? (settimeStamp(""), action("removed timestamp")())
          : (settimeStamp(item.timeStamp), action("added timestamp")())
      }
      className={`cursor-pointer text-shadow-CustomShadow  dark:bg-linearSideDark  bg-linearSide w-36 m-auto sm:m-0 sm:w-fit ${animation ? "hover:-translate-y-3 duration-200" : ""}  shadow-lg  text-center py-4 rounded-xl`}
    >
      <h1 data-testid="forecast_temp" className="text-lg">
        {item.temp} °C
      </h1>
      <img src={item.icon} className="w-24 h-24 m-auto" alt="" />
      <h1 className="tracking-wider text-lg font-light">{item.day}</h1>
    </div>
  );
};

export default WeatherForecastItem;

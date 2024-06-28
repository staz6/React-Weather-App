import React from "react";
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
  const { settimeStamp } = useWeatherContext();
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          settimeStamp(item.timeStamp);
        }
      }}
      onClick={() => settimeStamp(item.timeStamp)}
      className={`cursor-pointer bg-linearSide w-36 m-auto sm:m-0 sm:w-fit ${animation ? "hover:-translate-y-3 duration-200" : ""}  shadow-lg  text-center py-4 rounded-xl`}
    >
      <h1 className="text-lg">{item.temp} °C</h1>
      <img src={item.icon} className="w-24 h-24 m-auto" alt="" />
      <h1 className="tracking-wider text-lg font-thin">{item.day}</h1>
    </div>
  );
};

export default WeatherForecastItem;

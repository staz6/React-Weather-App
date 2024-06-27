import React from "react";

interface Props {
  item: {
    temp: number;
    icon: string;
    day: string;
  };
}

const WeatherForecastItem: React.FC<Props> = ({ item }) => (
  <div className="cursor-pointer bg-linearSide w-32 md:w-fit hover:-translate-y-3 duration-200 shadow-lg  text-center py-4 rounded-xl">
    <h1 className="text-lg">{item.temp} °C</h1>
    <img src={item.icon} className="w-24 h-24 m-auto" alt="" />
    <h1 className="tracking-wider text-lg font-thin">{item.day}</h1>
  </div>
);

export default WeatherForecastItem;

import React from "react";
import staticWeatherIcon from "../../assets/WeatherIcon.png";
import WeatherForecastItem from "../Compound/WeatherForecastItem";

const staticForecast = [
  {
    temp: 24,
    icon: staticWeatherIcon,
    day: "Mon",
  },
  {
    temp: 24,
    icon: staticWeatherIcon,
    day: "Mon",
  },
  {
    temp: 24,
    icon: staticWeatherIcon,
    day: "Mon",
  },
  {
    temp: 24,
    icon: staticWeatherIcon,
    day: "Mon",
  },
  {
    temp: 24,
    icon: staticWeatherIcon,
    day: "Mon",
  },
];

const WeatherForecastCard: React.FC = () => (
  <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-14 text-white">
    {staticForecast.map((item, index) => (
      <WeatherForecastItem item={item} key={index} />
    ))}
  </div>
);
export default WeatherForecastCard;

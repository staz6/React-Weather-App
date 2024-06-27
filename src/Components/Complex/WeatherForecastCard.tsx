import React from "react";
import SimpleSlider from "../Compound/Slider";
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
  <div className="mt-14 text-white">
    <div className=" hidden sm:flex flex-col sm:flex-row justify-center items-center gap-10  ">
      {staticForecast.map((item, index) => (
        <WeatherForecastItem animation item={item} key={index} />
      ))}
    </div>
    <div className="sm:hidden w-40 m-auto">
      <SimpleSlider>
        {staticForecast.map((item, index) => (
          <WeatherForecastItem animation={false} item={item} key={index} />
        ))}
      </SimpleSlider>
    </div>
  </div>
);

export default WeatherForecastCard;

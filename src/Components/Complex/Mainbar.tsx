import React from "react";
import DetailedWeatherCard from "./DetailedWeatherCard";
import WeatherForecastCard from "./WeatherForecastCard";
import WeatherAlert from "../Compound/WeatherAlert";

const Mainbar: React.FC = () => (
  <div className="flex  flex-col bg-linearMain  min-h-screen  w-full lg:w-2/3 p-2 lg:p-4 xl:p-7  overflow-x-hidden">
    <WeatherAlert />
    <DetailedWeatherCard />
    <WeatherForecastCard />
  </div>
);

export default Mainbar;

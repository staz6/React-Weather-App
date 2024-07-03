import React from "react";
import DetailedWeatherCard from "./DetailedWeatherCard";
import WeatherForecastCard from "./WeatherForecastCard";

const Mainbar: React.FC = () => (
  <div className="flex  flex-col bg-linearMain  min-h-screen  w-full lg:w-2/3 p-2 lg:p-4 xl:p-7  overflow-x-hidden">
    <DetailedWeatherCard />
    <WeatherForecastCard />
  </div>
);

export default Mainbar;

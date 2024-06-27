import React from "react";
import { BiWind } from "react-icons/bi";
import { BsCloudRainHeavy } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";
import { useWeatherContext } from "../../Context/WeatherContext";

const WeatherMetricsCard: React.FC = () => {
  const { currentWeatherData } = useWeatherContext();
  const rain = currentWeatherData?.rain?.["1h"];
  const wind = currentWeatherData?.wind.speed;
  const hum = currentWeatherData?.main.humidity;

  return (
    <div className="flex  items-center m-auto justify-center mt-10 sm:gap-8 gap-3 text-gray-200 text-sm sm:text-md">
      <div className="flex items-center sm:gap-2 gap-1">
        <BiWind className="sm:text-2xl text-lg" color="white" />
        <h3>
          <span className="sm:mr-2">{wind}</span> km/h
        </h3>
      </div>
      |
      <div className="flex items-center sm:gap-2 gap-1">
        <WiHumidity className="sm:text-2xl text-lg" color="white" />
        <h3>
          <span className="sm:mr-2">{hum}</span> %
        </h3>
      </div>
      |
      <div className="flex items-center sm:gap-2 gap-1">
        <BsCloudRainHeavy className="sm:text-2xl text-lg" color="white" />
        <h3>
          <span className="sm:mr-2">{rain}</span> mm
        </h3>
      </div>
    </div>
  );
};
export default WeatherMetricsCard;

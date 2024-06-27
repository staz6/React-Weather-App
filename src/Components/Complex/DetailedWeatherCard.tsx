import React from "react";
import SunEvent from "../Compound/SunEvent";
import WeatherMetricsCard from "../Compound/WeahterMetricsCard";
import { useWeatherContext } from "../../Context/WeatherContext";
import { suneventtimes } from "../../HelperFunctions/Helper";

const DetailedWeatherCard: React.FC = () => {
  const { currentWeatherData } = useWeatherContext();

  return (
    <div>
      <div className="flex justify-center gap-5 md:gap-10  mt-20">
        {currentWeatherData &&
          suneventtimes(currentWeatherData).map((event, index) => (
            <SunEvent event={event} key={index} id={index} />
          ))}
      </div>
      <div>
        <WeatherMetricsCard />
      </div>
    </div>
  );
};
export default DetailedWeatherCard;

import React from "react";
import { useWeatherContext } from "../../Context/WeatherContext";
import { calculateWeatherMetrics } from "../../HelperFunctions/Helper";

const WeatherMetricsCard: React.FC = () => {
  const { currentWeatherData } = useWeatherContext();

  const metrics = calculateWeatherMetrics(currentWeatherData);
  return (
    <div className="flex  items-center m-auto justify-center mt-10 sm:gap-8 gap-5 text-gray-200 text-sm sm:text-md">
      {metrics.map((Item, index) => (
        <>
          <div key={index} className="flex items-center sm:gap-2 gap-2">
            <Item.Icon className="sm:text-4xl text-xl" color="white" />
            <h3>
              <span className="sm:mr-2 sm:text-xl">
                {Item.value ? Item.value : "NA"}
              </span>{" "}
              <span className="sm:text-xl">{Item.unit}</span>
            </h3>
          </div>{" "}
          {index !== 2 && "|"}
        </>
      ))}
    </div>
  );
};
export default WeatherMetricsCard;

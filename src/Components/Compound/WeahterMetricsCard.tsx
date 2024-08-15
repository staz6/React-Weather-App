import React from "react";
import { useWeatherContext } from "../../Context/WeatherContext";
import calculateWeatherMetrics from "../../HelperFunctions/CalculateWeatherMetrics";
import wind from "../../assets/wind-direction-icon.png";
import hum from "../../assets/hum.svg";
import rain from "../../assets/Rain.svg";

const WeatherMetricsCard: React.FC = () => {
  const { currentWeatherData } = useWeatherContext();

  const metrics = calculateWeatherMetrics(currentWeatherData);
  return (
    <div
      data-testid="WeatherMetricsCard"
      className="flex text-shadow-CustomShadow  items-center m-auto justify-center mt-10 md:gap-5 sm:gap-8 gap-5 text-white font-[300] text-sm sm:text-md"
    >
      {metrics.map((Item, index) => (
        <div className="flex items-center sm:gap-8 gap-5" key={index}>
          <div key={index} className="flex items-center sm:gap-2  gap-2">
            {index === 0 && (
              <>
                <img className="mr-1 " src={wind} alt="" />
                <h1 className="text-xl sm:block hidden  mx-1">Wind</h1>
              </>
            )}
            {index === 2 && (
              <>
                <img className="mr-1 " src={rain} alt="" />
                <h1 className="text-xl sm:block hidden  mx-1">Rain</h1>
              </>
            )}
            {index === 1 && (
              <>
                <img className="mr-1 " src={hum} alt="" />
                <h1 className="text-xl sm:block hidden  mx-1">Hum</h1>
              </>
            )}

            <h3>
              <span className="sm:mr-2 sm:text-xl">
                {Item.value ? Item.value : "NA"}
              </span>{" "}
              <span className="sm:text-xl">{Item.unit}</span>
            </h3>
          </div>{" "}
          {index !== 2 && "|"}
        </div>
      ))}
    </div>
  );
};
export default WeatherMetricsCard;

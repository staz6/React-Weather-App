import React from "react";
import { BiWind } from "react-icons/bi";

const WeatherMetricsCard: React.FC = () => (
  <div className="flex  items-center m-auto justify-center mt-10 sm:gap-8 gap-3 text-gray-200 text-sm sm:text-md">
    <div className="flex items-center sm:gap-2 gap-1">
      <BiWind className="sm:text-2xl text-lg" color="white" />{" "}
      <h3>
        <span className="sm:mr-2">Wind</span> 10 km/h
      </h3>{" "}
    </div>
    |
    <div className="flex items-center sm:gap-2 gap-1">
      <BiWind className="sm:text-2xl text-lg" color="white" />{" "}
      <h3>
        <span className="sm:mr-2">Wind</span> 10 %
      </h3>{" "}
    </div>
    |
    <div className="flex items-center sm:gap-2 gap-1">
      <BiWind className="sm:text-2xl text-lg" color="white" />{" "}
      <h3>
        <span className="sm:mr-2">Wind</span> 10 %
      </h3>{" "}
    </div>
  </div>
);
export default WeatherMetricsCard;

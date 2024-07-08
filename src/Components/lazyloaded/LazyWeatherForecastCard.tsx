import React from "react";

const LazyWeatherForecastCard: React.FC = () => (
  <div className="sm:w-10/12 m-auto w-44 mt-8 flex justify-center items-center h-48  bg-gray-300  rounded-lg shadow-lg">
    <h1 className="text-center text-white text-2xl  ">Loading Forecast</h1>
  </div>
);

export default LazyWeatherForecastCard;

import React from "react";

const LazyCurrentWeatherCard: React.FC = () => (
  <div className="xl:w-[22rem] lg:w-[19rem] md:w-[22rem] w-full  flex justify-center mt-6 items-center h-96  bg-gray-300 rounded-lg shadow-lg">
    <h1 className="text-center text-white text-2xl  ">
      Loading CurrentWeather
    </h1>
  </div>
);

export default LazyCurrentWeatherCard;

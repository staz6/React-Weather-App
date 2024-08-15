import React from "react";

const LazyTemperatureChart: React.FC = () => (
  <div className="xl:w-[22rem] lg:w-[19rem] animate-pulse md:w-[22rem] w-full  flex justify-center  items-center h-48  bg-gray-300  rounded-lg shadow-lg">
    <h1 className="text-center text-white text-2xl  ">
      Loading Temperature Chart
    </h1>
  </div>
);

export default LazyTemperatureChart;

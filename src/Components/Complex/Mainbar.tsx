import React from "react";
import { useWeatherContext } from "../../Context/WeatherContext";

const Mainbar: React.FC = () => {
  const { searchCity } = useWeatherContext();
  return (
    <div className="flex  flex-col bg-linearMain  min-h-screen  w-full lg:w-2/3 p-7 lg:p-4 xl:p-7 space-y-10 overflow-x-hidden">
      <h2>{searchCity}</h2>
    </div>
  );
};

export default Mainbar;

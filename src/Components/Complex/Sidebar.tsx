import React, { Suspense, lazy } from "react";
import Searchbar from "../Compound/Searchbar";
import TemperatureChart from "../Compound/TemperatureChart";

const CurrentWeatherInfo = lazy(() => import("../Compound/CurrentWeatherCard"));

const Sidebar: React.FC = () => (
  <div className="border-r border-custom-gray flex flex-col bg-linearSide pb-10 lg:pb-0  w-full lg:w-1/3 p-7 lg:p-4 xl:p-7 space-y-0 overflow-x-hidden">
    <Searchbar />
    <div className="flex justify-center gap flex-col sm:flex-row items-center lg:flex-col">
      <Suspense fallback={<p>Loading...</p>}>
        <CurrentWeatherInfo />
      </Suspense>
      <TemperatureChart />
    </div>
  </div>
);

export default Sidebar;

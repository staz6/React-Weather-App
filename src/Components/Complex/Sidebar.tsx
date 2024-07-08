import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Searchbar from "../Compound/Searchbar";
import { useWeatherContext } from "../../Context/WeatherContext";

const TemperatureChart = lazy(() => import("../Compound/TemperatureChart"));
const CurrentWeatherInfo = lazy(() => import("../Compound/CurrentWeatherCard"));

const FallbackComponent: React.FC = () => (
  <div role="alert">
    <h1 className="text-center mt-5 text-white">
      Please Make Sure Such City Exists
    </h1>
  </div>
);

const Sidebar: React.FC = () => {
  const { searchCity } = useWeatherContext();

  return (
    <div className="border-r border-custom-gray flex flex-col bg-linearSide pb-10 lg:pb-0  w-full lg:w-1/3 p-7 lg:p-4 xl:p-7 space-y-0 overflow-x-hidden">
      <Searchbar />
      <div className="flex justify-center gap flex-col sm:flex-row items-center lg:flex-col">
        <ErrorBoundary
          FallbackComponent={FallbackComponent}
          resetKeys={[searchCity]}
        >
          <Suspense
            fallback={
              <div className="flex justify-center gap-10 flex-col sm:flex-row items-center lg:flex-col ">
                <div className="xl:w-[22rem] lg:w-[19rem] md:w-[22rem] w-full  flex justify-center mt-6 items-center h-96  bg-gray-300 rounded-lg shadow-lg">
                  <h1 className="text-center text-white text-2xl  ">
                    Loading CurrentWeather
                  </h1>
                </div>
                <div className="xl:w-[22rem] lg:w-[19rem] md:w-[22rem] w-full  flex justify-center  items-center h-48  bg-gray-300  rounded-lg shadow-lg">
                  <h1 className="text-center text-white text-2xl  ">
                    Loading Temperature Chart
                  </h1>
                </div>
              </div>
            }
          >
            {searchCity ? (
              <>
                <CurrentWeatherInfo />
                <TemperatureChart />
              </>
            ) : (
              <h1 className="text-center mt-5">No City Searched</h1>
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Sidebar;

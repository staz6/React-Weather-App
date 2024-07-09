import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Searchbar from "../Compound/Searchbar";
import { useWeatherContext } from "../../Context/WeatherContext";
import LazyCurrentWeatherCard from "../lazyloaded/LazyCurrentWeatherCard";
import LazyTemperatureChart from "../lazyloaded/LazyTemperatureChart";
import ThemeChanger from "../Compound/ThemeChanger";

const TemperatureChart = lazy(() => import("../Compound/TemperatureChart"));
const CurrentWeatherCard = lazy(() => import("../Compound/CurrentWeatherCard"));

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
    <div className="dark:bg-linearSideDark bg-linearSide  border-r border-custom-gray flex flex-col  pb-10 lg:pb-0  w-full lg:w-1/3 p-7 lg:p-4 xl:p-7 space-y-0 overflow-x-hidden">
      <Searchbar />
      <div className="flex justify-center gap flex-col sm:flex-row items-center lg:flex-col">
        <ErrorBoundary
          FallbackComponent={FallbackComponent}
          resetKeys={[searchCity]}
        >
          <Suspense
            fallback={
              <div className="flex justify-center gap-10 flex-col sm:flex-row items-center lg:flex-col ">
                <LazyCurrentWeatherCard />
                <LazyTemperatureChart />
              </div>
            }
          >
            {searchCity ? (
              <>
                <CurrentWeatherCard />
                <TemperatureChart />
              </>
            ) : (
              <h1 className="text-center mt-5 dark:text-white text-black">
                No City Searched
              </h1>
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
      <ThemeChanger />
    </div>
  );
};

export default Sidebar;

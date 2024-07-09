import React, { Suspense, lazy } from "react";
import { BiSun } from "react-icons/bi";
import { FaMoon } from "react-icons/fa6";
import { ErrorBoundary } from "react-error-boundary";
import Searchbar from "../Compound/Searchbar";
import { useWeatherContext } from "../../Context/WeatherContext";
import LazyCurrentWeatherCard from "../lazyloaded/LazyCurrentWeatherCard";
import LazyTemperatureChart from "../lazyloaded/LazyTemperatureChart";
import { useThemeContext } from "../../Context/ThemeChangerContext";
import Button from "../Shared/Button";

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
  const { Darktheme, setDarkTheme } = useThemeContext();

  return (
    <div
      className={`${Darktheme ? " bg-linearSideDark" : "bg-linearSide"}  border-r border-custom-gray flex flex-col  pb-10 lg:pb-0  w-full lg:w-1/3 p-7 lg:p-4 xl:p-7 space-y-0 overflow-x-hidden`}
    >
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
              <h1
                className={`text-center mt-5 ${Darktheme ? "text-white" : "text-black"}`}
              >
                No City Searched
              </h1>
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
      <Button
        icon=""
        className="fixed bottom-3 z-50 w-20 border rounded-2xl"
        description=""
        onClick={() => setDarkTheme((prev) => !prev)}
      >
        <div className="flex justify-between">
          <Button
            className={`${!Darktheme ? "bg-yellow-500 border " : ""} w-10 transition duration-300  rounded-2xl`}
            onClick={() => null}
            icon={<BiSun className="m-auto" color="white" size={24} />}
            description=""
          />
          <Button
            className={`${Darktheme ? "bg-black border " : ""} w-10 rounded-2xl transition duration-300 `}
            onClick={() => null}
            icon={<FaMoon className="m-auto" color="white" size={24} />}
            description=""
          />
        </div>
      </Button>
    </div>
  );
};

export default Sidebar;

import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import DetailedWeatherCard from "./DetailedWeatherCard";
import { useWeatherContext } from "../../Context/WeatherContext";

const WeatherForecastCard = lazy(() => import("./WeatherForecastCard"));

const FallbackComponent: React.FC = () => (
  <div role="alert">
    <h1 className="text-center mt-5 text-white">
      Please Make Sure Such City Exists
    </h1>
  </div>
);

const Mainbar: React.FC = () => {
  const { searchCity } = useWeatherContext();
  return (
    <div className="flex  flex-col bg-linearMain  min-h-screen  w-full lg:w-2/3 p-2 lg:p-4 xl:p-7  overflow-x-hidden">
      <DetailedWeatherCard />
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        resetKeys={[searchCity]}
      >
        <Suspense
          fallback={
            <div className="sm:w-10/12 w-44 flex justify-center items-center h-48  bg-gray-300 animate-pulse rounded-lg shadow-lg">
              <h1 className="text-center text-white text-2xl  animate-glow">
                Loading Forecast
              </h1>
            </div>
          }
        >
          {searchCity ? (
            <WeatherForecastCard />
          ) : (
            <h1 className="text-center mt-5">No City Searched</h1>
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Mainbar;

import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useWeatherContext } from "../../Context/WeatherContext";

const LazySuneventCard = lazy(() => import("../lazyloaded/LazySuneventCard"));
const LazyWeatherMetrics = lazy(
  () => import("../lazyloaded/LazyWeatherMetrics"),
);
const LazyWeatherForecastCard = lazy(
  () => import("../lazyloaded/LazyWeatherForecastCard"),
);

const WeatherForecastCard = lazy(() => import("./WeatherForecastCard"));
const DetailedWeatherCard = lazy(() => import("./DetailedWeatherCard"));

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
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        resetKeys={[searchCity]}
      >
        <Suspense
          fallback={
            <div className="flex-col ">
              <LazySuneventCard />
              <LazyWeatherMetrics />
              <LazyWeatherForecastCard />
            </div>
          }
        >
          {searchCity ? (
            <>
              <DetailedWeatherCard />
              <WeatherForecastCard />
            </>
          ) : (
            <h1 className="text-center mt-5">No City Searched</h1>
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Mainbar;

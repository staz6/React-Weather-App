import React, { useEffect } from "react";
import SimpleSlider from "../Compound/Slider";
import WeatherForecastItem from "../Compound/WeatherForecastItem";
import { useWeatherContext } from "../../Context/WeatherContext";
import useWeatherForecast from "../../CustomeHooks/WeatherForecastHook";

const WeatherForecastCard: React.FC = () => {
  const { searchCity, setWeatherForecastData } = useWeatherContext();
  const { forecastData, filteredData, isError, isSuccess } =
    useWeatherForecast(searchCity);

  useEffect(() => {
    if (isSuccess && filteredData) {
      setWeatherForecastData(filteredData);
    }
  }, [filteredData, isSuccess, setWeatherForecastData]);

  if (isError) return <div>Please Enter Correct City</div>;

  return (
    <div className="mt-14 text-white">
      <div className="hidden sm:flex flex-col sm:flex-row justify-center items-center gap-10">
        {forecastData?.map((item, index) => (
          <WeatherForecastItem animation item={item} key={index} />
        ))}
      </div>
      <div className="sm:hidden w-40 m-auto">
        <SimpleSlider>
          {forecastData?.map((item, index) => (
            <WeatherForecastItem animation={false} item={item} key={index} />
          ))}
        </SimpleSlider>
      </div>
    </div>
  );
};

export default WeatherForecastCard;

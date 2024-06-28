import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useWeatherContext } from "../../Context/WeatherContext";
import convertKelvinToCelsius from "../../HelperFunctions/Helper";
import CurrentTime from "./CurrentTime";
import useCurrentWeather from "../../CustomeHooks/CurrentWeatherHook";

const CurrentWeatherCard: React.FC = () => {
  const { searchCity, setCurrentWeatherData } = useWeatherContext();
  const { weatherData, isLoading, isError, isSuccess } =
    useCurrentWeather(searchCity);

  useEffect(() => {
    if (weatherData && isSuccess) {
      setCurrentWeatherData(weatherData);
    }
  }, [weatherData, isSuccess, setCurrentWeatherData]);
  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>No Such City Exist</h1>;
  if (!searchCity) {
    return <h1>No city searched</h1>;
  }

  const iconUrl = `http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;
  const formattedDate: string = dayjs().format("D MMM 'YY");
  const currentDay: string = dayjs().format("dddd");

  return (
    <div className="px-md-10 px-5 2xl:px-12 ">
      <img className="w-auto h-[180px] object-contain" src={iconUrl} alt="" />

      <div className="text-white pl-5 font-sans">
        <h1 className="text-9xl leading-none relative top-temp-top font-extralight mb-3">
          {convertKelvinToCelsius(weatherData?.main.temp)?.toFixed()}
          <sup className="text-3xl font-normal top-custom-super pl-4 align-super">
            °C
          </sup>
        </h1>

        <h2 className="text-3xl font-light mb-1">{formattedDate}</h2>
        <h3 className="text-xl font-light tracking-wide">
          {currentDay} <span className="mx-2">|</span>{" "}
          <CurrentTime className="" />
        </h3>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;

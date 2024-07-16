import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useWeatherContext } from "../../Context/WeatherContext";
import convertKelvinToCelsius, {
  getDayOfWeek,
} from "../../HelperFunctions/Helper";
import CurrentTime from "./CurrentTime";
import useCurrentWeather from "../../CustomeHooks/CurrentWeatherHook";

interface WeatherIcon {
  icon: string;
}

interface ShowWeatherType {
  dt_txt?: string;
  main: {
    temp: number;
  };
  weather?: WeatherIcon[];
}

const CurrentWeatherCard: React.FC = () => {
  const [showWeather, setShowWeather] = useState<ShowWeatherType | null>(null);
  const { searchCity, setCurrentWeatherData, timeStamp, weatherForecastData } =
    useWeatherContext();
  const { weatherData, isError } = useCurrentWeather(searchCity);

  useEffect(() => {
    if (weatherData) {
      if (timeStamp && weatherForecastData) {
        const selectedDayWeather = weatherForecastData.filter(
          (weather) => weather.dt_txt === timeStamp
        );
        setShowWeather(selectedDayWeather[0]);
        setCurrentWeatherData(selectedDayWeather[0]);
      } else {
        setShowWeather(weatherData);
        setCurrentWeatherData(weatherData);
      }
    }
  }, [timeStamp, weatherData, weatherForecastData, setCurrentWeatherData]);

  if (isError) return <h1>No Such City Exist</h1>;

  const iconUrl = showWeather?.weather?.[0]?.icon
    ? `http://openweathermap.org/img/wn/${showWeather.weather[0].icon}@2x.png`
    : "";
  const formattedDate: string = dayjs().format("D MMM 'YY");
  const currentDay: string = dayjs().format("dddd");

  return (
    <div className="px-md-10 px-5 2xl:px-12 relative -top-5">
      <img
        data-testid="WeatherIcon"
        className="w-auto h-[180px] object-contain"
        src={iconUrl}
        alt=""
      />

      <div className="text-white pl-5 font-sans">
        <h1
          data-testid="temperature"
          className="text-9xl leading-none relative top-temp-top font-extralight mb-3"
        >
          {convertKelvinToCelsius(showWeather?.main.temp)?.toFixed()}
          <sup className="text-3xl font-normal top-custom-super pl-4 align-super">
            °C
          </sup>
        </h1>

        <h2 className="text-3xl font-light mb-1">{formattedDate}</h2>
        <h3 className="text-xl font-light tracking-wide">
          {showWeather?.dt_txt ? getDayOfWeek(showWeather.dt_txt) : currentDay}{" "}
          <span className="mx-2">|</span> <CurrentTime className="" />
        </h3>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;

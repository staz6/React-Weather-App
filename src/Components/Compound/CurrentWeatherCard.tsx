import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import API_KEY from "../../ApiConfig/ApiConfig";
import { useWeatherContext } from "../../Context/WeatherContext";
import convertKelvinToCelsius from "../../HelperFunctions/Helper";

interface WeatherData {
  main: {
    temp: number;
  };
  dt: number;
  weather: {
    icon: string;
  }[];
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

const useCurrentTime = (): string => {
  const [currentTime, setCurrentTime] = React.useState<string>(
    dayjs().format("h:mm A"),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("h:mm A"));
    }, 60000);

    return () => clearInterval(interval);
  }, [currentTime]);

  return currentTime;
};

const CurrentWeatherCard: React.FC = () => {
  const { searchCity, setCurrentWeatherData } = useWeatherContext();
  const postQuery = useQuery<WeatherData>({
    queryKey: ["weather", searchCity],
    queryFn: async () => {
      try {
        const response = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`,
        );
        return response.data;
      } catch (error) {
        throw new Error("Error fetching data");
      }
    },
    enabled: !!searchCity,
  });
  const currentTimeAMPM = useCurrentTime();
  useEffect(() => {
    if (postQuery.data && postQuery.isSuccess) {
      setCurrentWeatherData(postQuery?.data);
    }
  }, [postQuery.data, postQuery.isSuccess, setCurrentWeatherData]);
  if (postQuery.isLoading) return <h1>Loading....</h1>;
  if (postQuery.isError) return <h1>No Such City Exist</h1>;
  if (!searchCity) {
    return <h1>No city searched</h1>;
  }

  const iconUrl = `http://openweathermap.org/img/wn/${postQuery.data?.weather[0].icon}@2x.png`;
  const formattedDate: string = dayjs().format("D MMM 'YY");
  const currentDay: string = dayjs().format("dddd");

  return (
    <div className="px-md-10 px-5 2xl:px-12 ">
      <img className="w-auto h-[180px] object-contain" src={iconUrl} alt="" />

      <div className="text-white pl-5 font-sans">
        <h1 className="text-9xl leading-none relative top-temp-top font-extralight mb-3">
          {convertKelvinToCelsius(postQuery.data?.main.temp)?.toFixed()}
          <sup className="text-3xl font-normal top-custom-super pl-4 align-super">
            °C
          </sup>
        </h1>

        <h2 className="text-3xl font-light mb-1">{formattedDate}</h2>
        <h3 className="text-xl font-light tracking-wide">
          {currentDay} <span className="mx-2">|</span> {currentTimeAMPM}
        </h3>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;

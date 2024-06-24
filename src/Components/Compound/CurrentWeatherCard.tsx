import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from 'dayjs';
import { useWeatherContext } from "../../Context/WeatherContext";

interface WeatherData {
  main: {
    temp: number;
  };
  dt: number;
  weather: {
    icon: string;
  }[];
}

const API_KEY = "a611ea741ba0588548e2d0e39313050b";

const convertKelvinToCelsius = (
  kelvin: number | undefined,
): number | undefined => (kelvin !== undefined ? kelvin - 273.15 : undefined);

const CurrentWeatherCard: React.FC = () => {
  const { searchCity } = useWeatherContext();

  const postQuery = useQuery<WeatherData>({
    queryKey: ["weather", searchCity],
    queryFn: async () => {
      try {
        const response = await axios.get<WeatherData>( // Specify the response type
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}`,
        );
        return response.data;
      } catch (error) {
        throw new Error("Error fetching data");
      }
    },
    enabled: !!searchCity,
  });

  if (postQuery.isLoading) return <h1>Loading....</h1>;
  if (postQuery.isError) return <h1>No Such City Exist</h1>;
  if (!searchCity) {
    return <h1>No city searched</h1>;
  }

  if (postQuery.data !== undefined) {
    // console.log(postQuery.data);
  }
  const iconUrl = `http://openweathermap.org/img/wn/${postQuery.data?.weather[0].icon}@2x.png`;
  const formattedDate: string = dayjs().format('D MMM \'YY');
  const currentDay: string = dayjs().format('dddd');
  const currentTimeAMPM: string = dayjs().format('h:mm A');
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

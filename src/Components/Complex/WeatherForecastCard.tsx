import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SimpleSlider from "../Compound/Slider";
import API_KEY from "../../ApiConfig/ApiConfig";
import WeatherForecastItem from "../Compound/WeatherForecastItem";
import { useWeatherContext } from "../../Context/WeatherContext";
import convertKelvinToCelsius, {
  getDayOfWeek,
} from "../../HelperFunctions/Helper";

interface WeatherListItem {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: [
    {
      icon: string;
    },
  ];
}

interface ForecastDataType {
  city: object;
  cnt: number;
  cod: string;
  list: WeatherListItem[];
  message: number;
}

const WeatherForecastCard: React.FC = () => {
  const { searchCity } = useWeatherContext();
  const postQuery = useQuery<ForecastDataType>({
    queryKey: ["forecast", searchCity],
    queryFn: async () => {
      try {
        const response = await axios.get<ForecastDataType>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}`,
        );
        return response.data;
      } catch (error) {
        throw new Error("Error fetching data");
      }
    },
    enabled: !!searchCity,
  });
  const ForecastData = postQuery?.data?.list.filter((timeperday) =>
    timeperday.dt_txt.includes("18:00:00"),
  );

  const ConvertForecastData = ForecastData?.map((weather) => ({
    temp: parseFloat(
      convertKelvinToCelsius(weather.main.temp)?.toFixed() ?? "0",
    ),
    icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
    day: getDayOfWeek(weather.dt_txt),
  }));
  return (
    <div className="mt-14 text-white">
      <div className=" hidden sm:flex flex-col sm:flex-row justify-center items-center gap-10  ">
        {ConvertForecastData?.map((item, index) => (
          <WeatherForecastItem animation item={item} key={index} />
        ))}
      </div>
      <div className="sm:hidden w-40 m-auto">
        <SimpleSlider>
          {ConvertForecastData?.map((item, index) => (
            <WeatherForecastItem animation={false} item={item} key={index} />
          ))}
        </SimpleSlider>
      </div>
    </div>
  );
};

export default WeatherForecastCard;

import React, { useEffect, useState } from "react";
import SunEvent from "../Compound/SunEvent";
import WeatherMetricsCard from "../Compound/WeahterMetricsCard";
import { useWeatherContext } from "../../Context/WeatherContext";
import suneventtimes from "../../HelperFunctions/Suneventtimes";

interface SunEventData {
  sys: {
    sunrise: number;
    sunset: number;
  };
}

const DetailedWeatherCard: React.FC = () => {
  const { currentWeatherData } = useWeatherContext();
  const [prevSunevent, setPrevsunevent] = useState<SunEventData | null>(null);

  useEffect(() => {
    if (
      currentWeatherData?.sys.sunrise !== undefined &&
      currentWeatherData?.sys.sunset !== undefined
    ) {
      setPrevsunevent({
        sys: {
          sunrise: currentWeatherData.sys.sunrise,
          sunset: currentWeatherData.sys.sunset,
        },
      });
    }
  }, [currentWeatherData]);

  return (
    <div>
      <div className="flex justify-center gap-5 md:gap-10 mt-16">
        {prevSunevent &&
          suneventtimes(prevSunevent).map((event, index) => (
            <SunEvent event={event} key={index} id={index} />
          ))}
      </div>
      <div>
        <WeatherMetricsCard />
      </div>
    </div>
  );
};

export default DetailedWeatherCard;

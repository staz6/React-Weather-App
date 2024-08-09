import React from "react";
import { useWeatherContext } from "../../Context/WeatherContext";
import suneventtimes from "../../HelperFunctions/Suneventtimes";
import SunEvent from "./SunEvent";

const SuneventCard: React.FC = () => {
  const { prevSunevent } = useWeatherContext();

  return (
    <div className="flex justify-center gap-5 md:gap-10 mt-16">
      {prevSunevent &&
        suneventtimes(prevSunevent).map((event, index) => (
          <SunEvent event={event} key={index} id={index} />
        ))}
    </div>
  );
};

export default SuneventCard;

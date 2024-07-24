import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import Button from "../Shared/Button";
import { useWeatherContext } from "../../Context/WeatherContext";

const FavCities: React.FC = () => {
  const { searchCity, favCity, setFavCity } = useWeatherContext();

  return (
    <Button
      className="z-10"
      testid="FavCity"
      icon={
        favCity.includes(searchCity) ? (
          <BsStarFill id="start_fill" color="yellow" size={22} />
        ) : (
          <BsStar id="start_empty" size={22} color="white" />
        )
      }
      description=""
      onClick={() =>
        !favCity.includes(searchCity) && searchCity !== ""
          ? setFavCity((prev) => [...prev, searchCity])
          : setFavCity((prev) => prev.filter((e) => e !== searchCity))
      }
    />
  );
};

export default FavCities;

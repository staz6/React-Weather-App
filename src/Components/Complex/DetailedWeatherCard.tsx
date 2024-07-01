import React from "react";
import WeatherMetricsCard from "../Compound/WeahterMetricsCard";
import SuneventCard from "../Compound/SuneventCard";

const DetailedWeatherCard: React.FC = () => (
  <div>
    <SuneventCard />
    <WeatherMetricsCard />
  </div>
);

export default DetailedWeatherCard;

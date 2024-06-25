import React from "react";
import SunEvent from "../Compound/SunEvent";

const DetailedWeatherCard: React.FC = () => (
  <div className="flex justify-center gap-5 md:gap-10  mt-20">
    <SunEvent id={0} />
    <SunEvent id={1} />
    <SunEvent id={2} />
  </div>
);

export default DetailedWeatherCard;

import React from "react";
import StaticWeatherImg from "../../assets/WeatherIcon.png";

const CurrentWeatherCard: React.FC = () => (
  <div className="px-md-10 px-5 2xl:px-12 ">
    <img
      className="w-auto h-[180px] object-contain"
      src={StaticWeatherImg}
      alt=""
    />

    <div className="text-white pl-5 font-sans">
      <h1 className="text-9xl leading-none relative top-temp-top font-extralight mb-3">
        27.2
        <sup className="text-3xl font-normal top-custom-super pl-4 align-super">
          °C
        </sup>
      </h1>

      <h2 className="text-3xl font-light mb-1">17th Jun &apos;21</h2>
      <h3 className="text-xl font-light tracking-wide">
        Thursday <span className="mx-2">|</span> 4:52 PM
      </h3>
    </div>
  </div>
);

export default CurrentWeatherCard;

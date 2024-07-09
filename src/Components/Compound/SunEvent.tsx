import React from "react";
import clockImg from "../../assets/Group 657 (1).png";
import { useThemeContext } from "../../Context/ThemeChangerContext";

interface Props {
  id: number;
  event: {
    name: string;
    ampm: string;
    militaryTime: string;
  };
}
const SunEvent: React.FC<Props> = ({ id, event }) => {
  const [time, period] = event.ampm.split(" ");
  const { Darktheme } = useThemeContext();
  return (
    <div
      className={`relative text-center font-sans  text-white ${id === 1 ? "bottom-7" : ""}`}
    >
      <h1 className={`${id === 1 ? "text-xl" : "text-lg"} font-light mb-8`}>
        {event.name}
      </h1>
      <div
        className={`${Darktheme ? "bg-linearSideDark" : "bg-linearSide"}  ${id === 1 ? "h-56" : "h-52"} ${id !== 1 ? "px-3" : "px-0"}  rounded-[4rem] py-6`}
      >
        <img className="h-10 m-auto  w-16" src={clockImg} alt="" />
        <h2 className={`${id === 1 ? "mt-14" : "mt-12 "}`}>
          <span className="sm:text-xl text-lg tracking-wider">{time} </span>
          <span className="text-sm text-gray-200 sm:text-md">{period}</span>
        </h2>
        <h2 className="mt-2 sm:text-lg tracking-widest text-gray-200">
          {event.militaryTime}
        </h2>
      </div>
    </div>
  );
};

export default SunEvent;

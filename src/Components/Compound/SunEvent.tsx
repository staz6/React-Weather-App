import React from "react";
import clockImg from "../../assets/Group 657 (1).png";

interface Props {
  id: number;
  event: {
    name: string;
    ampm: string;
    militaryTime: string;
  };
}
const SunEvent: React.FC<Props> = ({ id, event }) => (
  <div
    className={`relative text-center font-sans  text-white ${id === 1 ? "bottom-7" : ""}`}
  >
    <h1 className={`${id === 1 ? "text-xl" : "text-lg"} font-light mb-8`}>
      {event.name}
    </h1>
    <div
      className={`bg-linearSide ${id === 1 ? "h-56" : "h-52"} ${id !== 1 ? "px-3" : "px-0"}  rounded-[4rem] py-6`}
    >
      <img className="h-10 m-auto  w-16" src={clockImg} alt="" />
      <h2 className="mt-12">
        <span className="text-xl tracking-wider">{event.ampm} </span>
        {/* <span className="font-thin text-xs">AM</span> */}
      </h2>
      <h2 className="mt-2 text-lg tracking-widest text-gray-200">
        {event.militaryTime}
      </h2>
    </div>
  </div>
);

export default SunEvent;

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
const SunEvent: React.FC<Props> = ({ id, event }) => {
  const [time, period] = event.ampm.split(" ");
  return (
    <div
      data-testid="sunevent"
      className={`relative text-center font-light  text-white ${id === 1 ? "bottom-10" : ""}`}
    >
      <h1 className="sm:text-2xl text-xl text-shadow-CustomShadow  mb-8">
        {event.name}
      </h1>
      <div
        className={` bg-white bg-opacity-20 m-auto  ${id === 1 ? "h-56 px-0 w-[7.5rem]" : "h-52  px-3"}  rounded-[4rem] py-6`}
      >
        <img
          className={` m-auto ${id === 1 ? "w-20 h-12" : ""} `}
          src={clockImg}
          alt=""
        />
        <h2 className={`${id === 1 ? "mt-14 mb-2" : "mt-12 "}`}>
          <span className="sm:text-[1.7rem] text-2xl tracking-wider">
            {time}{" "}
          </span>
          <span className="text-sm text-gray-200 sm:text-md">
            {id === 1 && period}
          </span>
        </h2>
        <h2 className="mt-1 sm:text-[1.3rem] text-xl tracking-widest text-gray-200">
          {event.militaryTime}
        </h2>
      </div>
    </div>
  );
};

export default SunEvent;

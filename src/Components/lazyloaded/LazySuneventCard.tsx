import React from "react";

const LazySuneventCard: React.FC = () => {
  const array = ["Sunset", "Golden Hour", "Sunrise"];
  return (
    <div className="flex justify-center gap-5 md:gap-10 mt-16  ">
      {array.map((item, index) => (
        <div
          key={index}
          className={`relative text-center   text-white ${index === 1 ? "bottom-7" : ""}`}
        >
          <h1
            className={`${index === 1 ? "text-xl" : "text-lg"} font-light mb-8`}
          >
            {item}
          </h1>
          <div
            className={`bg-gray-300 flex justify-center items-center  ${index === 1 ? "h-56" : "h-52"} ${index !== 1 ? "px-3" : "px-0"}  rounded-[4rem] py-6`}
          >
            <h1>Loading</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LazySuneventCard;

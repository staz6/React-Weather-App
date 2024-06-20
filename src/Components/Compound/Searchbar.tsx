import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Input from "../Shared/Input";
import Button from "../Shared/Button";

interface Props {}

const Searchbar: React.FC<Props> = () => {
  const [city, setCity] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchInput = (): null => {
    setIsOpen(true);
    return null;
  };

  const searchWeather = (): null => {
    setIsOpen(false);
    return null;
  };

  return (
    <div
      className={`flex flex-row justify-between ${isOpen ? "gap-10 " : ""}  items-center`}
    >
      {!isOpen ? (
        <>
          <Button
            onClick={searchInput}
            icon={<BiSearch size={26} className="text-white" />}
            className=""
          />
          <span className="text-white text-2xl w-80 capitalize ml-2">
            {city}
          </span>
          <Button
            onClick={searchInput}
            icon={<BiSearch size={26} className="text-white" />}
            className="bg-white p-2 bg-opacity-40 rounded-lg"
          />
        </>
      ) : (
        <>
          <Input
            setCity={setCity}
            city={city}
            placeholder="Enter City"
            type="string"
            className="bg-white p-2 w-full text-xl  rounded-md capitalize pl-5 bg-opacity-40 focus:outline-white  focus:outline-offset-1"
          />
          <Button
            onClick={searchWeather}
            icon={<BiSearch size={26} className="text-white" />}
            className="bg-white p-2 bg-opacity-40 rounded-lg"
          />
        </>
      )}
    </div>
  );
};

export default Searchbar;

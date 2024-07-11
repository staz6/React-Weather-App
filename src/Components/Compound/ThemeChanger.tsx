import React from "react";
import { BiSun } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import Button from "../Shared/Button";
import { useTheme } from "../../Context/ThemeChangerContext";

const ThemeChanger: React.FC = () => {
  const { toggleDarkTheme } = useTheme();
  return (
    <Button
      icon=""
      className="fixed bottom-3 flex justify-between z-50 w-20 border rounded-2xl"
      description=""
      onClick={toggleDarkTheme}
    >
      <BiSun
        className="m-auto   dark:bg-transparent bg-yellow-300 w-10 transition duration-300  rounded-2xl"
        color="white"
        size={24}
      />
      <FaMoon
        className="m-auto dark:bg-black bg-transparent w-10 transition duration-300  rounded-2xl"
        color="white"
        size={21}
      />
    </Button>
  );
};

export default ThemeChanger;

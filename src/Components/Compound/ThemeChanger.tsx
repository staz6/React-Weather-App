import React from "react";
import { BiSun } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import { useThemeContext } from "../../Context/ThemeChangerContext";
import Button from "../Shared/Button";

const ThemeChanger: React.FC = () => {
  const { Darktheme, setDarkTheme } = useThemeContext();
  return (
    <Button
      icon=""
      className="fixed bottom-3 z-50 w-20 border rounded-2xl"
      description=""
      onClick={() => setDarkTheme((prev) => !prev)}
    >
      <div className="flex justify-between">
        <Button
          className={`${!Darktheme ? "bg-yellow-500 border " : ""} w-10 transition duration-300  rounded-2xl`}
          onClick={() => null}
          icon={<BiSun className="m-auto" color="white" size={24} />}
          description=""
        />
        <Button
          className={`${Darktheme ? "bg-black border " : ""} w-10 rounded-2xl transition duration-300 `}
          onClick={() => null}
          icon={<FaMoon className="m-auto" color="white" size={24} />}
          description=""
        />
      </div>
    </Button>
  );
};

export default ThemeChanger;

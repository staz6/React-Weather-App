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
      className="fixed bottom-3 z-50 w-20 border rounded-2xl"
      description=""
      onClick={toggleDarkTheme}
    >
      <div className="flex justify-between">
        <Button
          className="dark:bg-transparent bg-yellow-300 w-10 transition duration-300  rounded-2xl"
          onClick={() => null}
          icon={<BiSun className="m-auto" color="white" size={24} />}
          description=""
        />
        <Button
          className="dark:bg-black bg-transparent w-10 transition duration-300  rounded-2xl"
          onClick={() => null}
          icon={<FaMoon className="m-auto" color="white" size={24} />}
          description=""
        />
      </div>
    </Button>
  );
};

export default ThemeChanger;

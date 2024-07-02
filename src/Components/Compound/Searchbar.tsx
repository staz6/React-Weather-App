import React, { useReducer } from "react";
import { BiSearch } from "react-icons/bi";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import { useWeatherContext } from "../../Context/WeatherContext";

interface State {
  city: string;
  isOpen: boolean;
  applyAnimation: boolean;
  timeoutId: NodeJS.Timeout | null;
}

type Action =
  | { type: "SET_CITY"; payload: string }
  | { type: "SET_IS_OPEN"; payload: boolean }
  | { type: "SET_APPLY_ANIMATION"; payload: boolean }
  | { type: "SET_TIMEOUT_ID"; payload: NodeJS.Timeout | null };

const initialState: State = {
  city: "",
  isOpen: false,
  applyAnimation: false,
  timeoutId: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_IS_OPEN":
      return { ...state, isOpen: action.payload };
    case "SET_APPLY_ANIMATION":
      return { ...state, applyAnimation: action.payload };
    case "SET_TIMEOUT_ID":
      return { ...state, timeoutId: action.payload };
    default:
      return state;
  }
};

const Searchbar: React.FC = () => {
  const { setSearchCity } = useWeatherContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { city, isOpen, applyAnimation, timeoutId } = state;

  const searchInput = (): void => {
    dispatch({ type: "SET_IS_OPEN", payload: true });
    dispatch({ type: "SET_APPLY_ANIMATION", payload: true });
  };

  const searchWeather = (): void => {
    setSearchCity(city);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(
      () => dispatch({ type: "SET_IS_OPEN", payload: false }),
      150,
    );
    dispatch({ type: "SET_TIMEOUT_ID", payload: newTimeoutId });
    dispatch({ type: "SET_APPLY_ANIMATION", payload: false });
  };
  const handleInput = (): void => (isOpen ? searchWeather() : searchInput());

  return (
    <div
      className={`flex flex-row justify-between ${isOpen ? "gap-10 " : ""} items-center`}
    >
      {!isOpen ? (
        <>
          <Button
            description=""
            className=""
            onClick={searchInput}
            icon={<BiSearch size={26} className="text-white" />}
          />
          <span className="text-white text-2xl w-80 capitalize ml-2">
            {city}
          </span>
        </>
      ) : (
        <Input
          onChange={(newValue) =>
            dispatch({ type: "SET_CITY", payload: newValue })
          }
          value={city}
          placeholder="Enter City"
          type="string"
          className={`bg-white p-2 w-full text-xl ${applyAnimation ? "slide-in" : "slide-out"} rounded-md capitalize pl-5 bg-opacity-40 focus:outline-white focus:outline-offset-1`}
        />
      )}
      <Button
        description=""
        onClick={handleInput}
        icon={<BiSearch size={28} className="text-white" />}
        className="bg-white p-2 bg-opacity-40 rounded-lg"
      />
    </div>
  );
};

export default Searchbar;

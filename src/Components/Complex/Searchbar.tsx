import React, { useEffect, useReducer } from "react";
import { BiSearch } from "react-icons/bi";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import { useWeatherContext } from "../../Context/WeatherContext";
import WeatherAlert from "../Compound/WeatherAlert";
import FavCities from "../Compound/FavCities";
import CurrentLocation from "../Compound/CurrentLocation";

interface State {
  city: string;
  isOpen: boolean;
  applyAnimation: boolean;
  timeoutId: NodeJS.Timeout | null;
  showFavCities: boolean;
}

type Action =
  | { type: "SET_CITY"; payload: string }
  | { type: "SET_IS_OPEN"; payload: boolean }
  | { type: "SET_APPLY_ANIMATION"; payload: boolean }
  | { type: "SET_TIMEOUT_ID"; payload: NodeJS.Timeout | null }
  | { type: "SET_SHOWFAVORITE_CITY"; payload: boolean };

const initialState: State = {
  city: "",
  isOpen: false,
  applyAnimation: false,
  timeoutId: null,
  showFavCities: false,
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
    case "SET_SHOWFAVORITE_CITY":
      return { ...state, showFavCities: action.payload };
    default:
      return state;
  }
};

const Searchbar: React.FC = () => {
  const { setSearchCity, favCity, searchCity } = useWeatherContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { city, isOpen, applyAnimation, timeoutId, showFavCities } = state;

  const searchInput = (): void => {
    dispatch({ type: "SET_IS_OPEN", payload: true });
    dispatch({ type: "SET_APPLY_ANIMATION", payload: true });
  };

  useEffect(() => {
    dispatch({ type: "SET_CITY", payload: searchCity });
  }, [searchCity]);
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
          <CurrentLocation />
          <span className="text-white z-10 text-2xl w-80 capitalize ml-2">
            {city}
          </span>
        </>
      ) : (
        <div className="flex-col relative w-full">
          <Input
            onChange={(newValue) =>
              dispatch({ type: "SET_CITY", payload: newValue })
            }
            onClick={() =>
              dispatch({ type: "SET_SHOWFAVORITE_CITY", payload: true })
            }
            value={city}
            placeholder="Enter City"
            type="string"
            className={`bg-white z-10 text-zinc-800 dark:text-white p-1.5 w-full text-xl ${applyAnimation ? "slide-in" : "slide-out"} rounded-md capitalize pl-5 bg-opacity-40 focus:outline-white focus:outline-offset-1`}
          />
          {showFavCities && favCity.length !== 0 && (
            <div
              className={`border absolute bg-white dark:text-white bg-opacity-40 z-10 mt-1 rounded-md ${applyAnimation ? "slide-in" : "slide-out"} text-center w-full`}
            >
              {favCity.map((e, index) => (
                <div
                  role="button"
                  tabIndex={0}
                  className=" cursor-pointer hover:bg-white hover:bg-opacity-50  flex justify-between px-2 py-1"
                  onClick={() => dispatch({ type: "SET_CITY", payload: e })}
                  onKeyDown={(e_key) =>
                    e_key.key === "Enter"
                      ? dispatch({ type: "SET_CITY", payload: e })
                      : " "
                  }
                  key={index}
                >
                  <h1>{index + 1}.</h1>
                  <h1 className="w-full capitalize  "> {e}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex items-center gap-4">
        <FavCities />
        <Button
          description=""
          onClick={handleInput}
          icon={<BiSearch size={28} className="text-white" />}
          className="bg-white z-10 p-2 bg-opacity-40 rounded-lg"
        />
        <WeatherAlert />
      </div>
    </div>
  );
};

export default Searchbar;

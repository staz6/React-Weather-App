import React, { useEffect, useReducer } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { GoLocation } from "react-icons/go";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import { useWeatherContext } from "../../Context/WeatherContext";
import useCityNameFetch from "../../CustomeHooks/CurrentLocationHook";
import WeatherAlert from "./WeatherAlert";
import FavCities from "./FavCities";

interface State {
  city: string;
  isOpen: boolean;
  applyAnimation: boolean;
  timeoutId: NodeJS.Timeout | null;
  showFavCities: boolean;
  lat: number;
  lon: number;
  isCurrentLocation: boolean;
}

type Action =
  | { type: "SET_CITY"; payload: string }
  | { type: "SET_IS_OPEN"; payload: boolean }
  | { type: "SET_APPLY_ANIMATION"; payload: boolean }
  | { type: "SET_TIMEOUT_ID"; payload: NodeJS.Timeout | null }
  | { type: "SET_SHOWFAVORITE_CITY"; payload: boolean }
  | { type: "GET_COORDINATES"; payload: { lat: number; lon: number } }
  | { type: "USE_CURRENTLOCATION"; payload: boolean };

const initialState: State = {
  city: "",
  isOpen: false,
  applyAnimation: false,
  timeoutId: null,
  showFavCities: false,
  lat: 0,
  lon: 0,
  isCurrentLocation: true,
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
    case "GET_COORDINATES":
      return { ...state, lat: action.payload.lat, lon: action.payload.lon };
    case "USE_CURRENTLOCATION":
      return { ...state, isCurrentLocation: action.payload };
    default:
      return state;
  }
};

const Searchbar: React.FC = () => {
  const { setSearchCity, favCity, searchCity } = useWeatherContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    city,
    isOpen,
    applyAnimation,
    timeoutId,
    showFavCities,
    lat,
    lon,
    isCurrentLocation,
  } = state;

  const searchInput = (): void => {
    dispatch({ type: "SET_IS_OPEN", payload: true });
    dispatch({ type: "SET_APPLY_ANIMATION", payload: true });
  };

  const searchWeather = (): void => {
    dispatch({ type: "USE_CURRENTLOCATION", payload: false });
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

  const handlelocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          dispatch({
            type: "GET_COORDINATES",
            payload: { lat: latitude, lon: longitude },
          });
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            // eslint-disable-next-line no-alert
            alert(
              "Geolocation is not enabled or not supported by this browser.",
            );
          }
        },
      );
    } else {
      // eslint-disable-next-line no-alert
      window.alert("Geolocation is not supported by this browser.");
    }
  };
  const { cityName } = useCityNameFetch({ lat, lon });
  useEffect(() => {
    handlelocation();
  }, []);

  useEffect(() => {
    if (cityName && isCurrentLocation) {
      setSearchCity(cityName);
    }
    dispatch({ type: "SET_CITY", payload: searchCity });
  }, [cityName, isCurrentLocation, searchCity, setSearchCity]);

  return (
    <div
      className={`flex flex-row justify-between ${isOpen ? "gap-10 " : ""} items-center`}
    >
      {!isOpen ? (
        <>
          <Button
            testid="location_btn"
            description=""
            className=""
            onClick={() => {
              dispatch({ type: "USE_CURRENTLOCATION", payload: true });
              handlelocation();
            }}
            icon={<GoLocation size={26} className="text-white" />}
          />
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
            className={`bg-white z-10 SearchInput text-zinc-800 dark:text-white p-1.5 w-full text-xl ${applyAnimation ? "slide-in" : "slide-out"} rounded-md capitalize pl-5 bg-opacity-40 focus:outline-white focus:outline-offset-1`}
          />
          {showFavCities && favCity.length !== 0 && (
            <div
              className={`border absolute bg-white dark:text-white bg-opacity-40 z-10 mt-1 rounded-md ${applyAnimation ? "slide-in" : "slide-out"} text-center w-full`}
            >
              {favCity.map((e, index) => (
                <div
                  data-testid="favcitylist"
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
          testid="searchcity_input"
          description=""
          onClick={handleInput}
          icon={<PiMagnifyingGlassBold size={24} className="text-white" />}
          className="bg-bgSearch border-l  backdrop-blur-xl z-10 p-3 rounded-2xl"
        />
        <WeatherAlert />
      </div>
    </div>
  );
};

export default Searchbar;

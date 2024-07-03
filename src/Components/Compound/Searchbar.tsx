import React, { useEffect, useReducer } from "react";
import { BiSearch } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import { useWeatherContext } from "../../Context/WeatherContext";
import useCityNameFetch from "../../CustomeHooks/CurrentLocationHook";
import WeatherAlert from "./WeatherAlert";

interface State {
  city: string;
  isOpen: boolean;
  applyAnimation: boolean;
  timeoutId: NodeJS.Timeout | null;
  lat: number | null;
  lon: number | null;
  currentLocation: boolean;
}

type Action =
  | { type: "SET_CITY"; payload: string }
  | { type: "SET_IS_OPEN"; payload: boolean }
  | { type: "SET_APPLY_ANIMATION"; payload: boolean }
  | { type: "SET_TIMEOUT_ID"; payload: NodeJS.Timeout | null }
  | { type: "SET_COORDINATES"; payload: { lat: number; lon: number } }
  | { type: "SET_CURRENT_LOCATION"; payload: boolean };

const initialState: State = {
  city: "",
  isOpen: false,
  applyAnimation: false,
  timeoutId: null,
  lat: null,
  lon: null,
  currentLocation: false,
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
    case "SET_COORDINATES":
      return { ...state, lat: action.payload.lat, lon: action.payload.lon };
    case "SET_CURRENT_LOCATION":
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
};

const Searchbar: React.FC = () => {
  const { setSearchCity } = useWeatherContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { city, isOpen, applyAnimation, timeoutId, lat, lon, currentLocation } =
    state;

  const searchInput = (): void => {
    dispatch({ type: "SET_IS_OPEN", payload: true });
    dispatch({ type: "SET_APPLY_ANIMATION", payload: true });
    dispatch({ type: "SET_CURRENT_LOCATION", payload: false });
  };

  const onSuccess = (position: GeolocationPosition): void => {
    const { latitude, longitude } = position.coords;
    dispatch({
      type: "SET_COORDINATES",
      payload: { lat: latitude, lon: longitude },
    });
  };

  const onError = (error: GeolocationPositionError): void => {
    if (error.code === error.PERMISSION_DENIED) {
      // eslint-disable-next-line no-alert
      alert(
        "You have denied access to your location. Please enable it to use this feature.",
      );
    } else {
      // eslint-disable-next-line no-alert
      alert("Geolocation is not enabled or not supported by this browser.");
    }
  };

  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const { cityName } = useCityNameFetch({ lat, lon });
  useEffect(() => {
    if (currentLocation && cityName) {
      setSearchCity(cityName);
      dispatch({ type: "SET_CITY", payload: cityName });
    }
  }, [currentLocation, cityName, setSearchCity]);

  const handleLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
      dispatch({ type: "SET_CURRENT_LOCATION", payload: true });
    }
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
            onClick={handleLocation}
            icon={<CiLocationOn size={26} className="text-white" />}
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
      <div className="flex items-center gap-4">
        <Button
          description=""
          onClick={handleInput}
          icon={<BiSearch size={28} className="text-white" />}
          className="bg-white p-2 bg-opacity-40 rounded-lg"
        />
        <WeatherAlert />
      </div>
    </div>
  );
};

export default Searchbar;

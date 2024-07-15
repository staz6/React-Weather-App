import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import Button from "../Shared/Button";
import useCityNameFetch from "../../CustomeHooks/CurrentLocationHook";
import { useWeatherContext } from "../../Context/WeatherContext";

const CurrentLocation: React.FC = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const { setSearchCity } = useWeatherContext();
  const { cityName } = useCityNameFetch(coordinates);
  if (cityName) {
    setSearchCity(cityName);
  }
  const onSuccess = (position: GeolocationPosition): void => {
    const { latitude, longitude } = position.coords;
    setCoordinates({ lat: latitude, lon: longitude });
  };

  const onError = (error: GeolocationPositionError): void => {
    if (error) {
      // eslint-disable-next-line no-alert
      alert("Geolocation is not enabled or not supported by this browser.");
    }
  };

  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const handleLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }
  };

  return (
    <Button
      testid="location_btn"
      description=""
      className=""
      onClick={handleLocation}
      icon={<CiLocationOn size={26} className="text-white" />}
    />
  );
};
export default CurrentLocation;

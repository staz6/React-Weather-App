import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BiBell } from "react-icons/bi";
import { ALERT_API_KEY } from "../../ApiConfig/ApiConfig";
import { useWeatherContext } from "../../Context/WeatherContext";
import Button from "../Shared/Button";

// Define the interface for the alert data
interface Alert {
  category: string;
  headline: string;
  desc: string;
  // Add other relevant fields here
}
interface WeatherAlertResponse {
  alerts: {
    alert: Alert[];
  };
}
const WeatherAlert: React.FC = () => {
  const { searchCity } = useWeatherContext();
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  const { isLoading, error, data } = useQuery<WeatherAlertResponse>({
    queryKey: ["WeatherAlerts", searchCity],
    queryFn: () =>
      fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${ALERT_API_KEY}&q=${searchCity}&alerts=yes`,
      ).then((res) => res.json()),
    enabled: !!searchCity,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const alerts: Alert[] = data?.alerts?.alert || [];

  return (
    <div>
      <Button
        className=""
        description=""
        onClick={() => setOpenMessage(!openMessage)}
        icon={<BiBell size={26} />}
      />
      {openMessage &&
        (alerts.length > 0 ? (
          <h1>Weather Notifications</h1>
        ) : (
          <h1>No notifications</h1>
        ))}
      {openMessage &&
        alerts.length > 0 &&
        alerts.map((alert, index) => (
          <div key={index}>
            <p>{alert.category}</p>
            <p>{alert.headline}</p>
            <p>{alert.desc}</p>
          </div>
        ))}
    </div>
  );
};

export default WeatherAlert;

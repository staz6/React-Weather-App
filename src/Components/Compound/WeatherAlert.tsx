import React, { useEffect } from "react";
import { BiBell } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";
import { useWeatherContext } from "../../Context/WeatherContext";
import Button from "../Shared/Button";
import WeatherAlertHook from "../../CustomeHooks/WeatherAlertHook";

const WeatherAlert: React.FC = () => {
  const { searchCity } = useWeatherContext();

  const { isError, data } = WeatherAlertHook({ searchCity });
  useEffect(() => {
    if (data && data.alerts && data.alerts.alert.length > 0) {
      data.alerts.alert.forEach((alert) => {
        toast(
          (t) => (
            <div data-testid="auto_notify" className="">
              <div className="flex justify-end">
                <Button
                  onClick={() => toast.dismiss(t.id)}
                  className=""
                  icon={<RxCross2 size={22} />}
                  description=""
                />
              </div>
              <h2 className="text-2xl">{alert.headline}</h2>
              <h1 className="text-red-500 my-1">{alert.category} !</h1>
              <div className="text-sm h-52 overflow-y-scroll">
                {alert.desc
                  .trim()
                  .split("*")
                  .map((line, i) => (
                    <p key={i} className="text-sm mb-1">
                      {line.trim()}
                    </p>
                  ))}
              </div>
            </div>
          ),
          {
            duration: 5000,
            id: alert.desc,
          },
        );
      });
    }
  }, [data]);

  if (isError) {
    return <div data-testid="weatherAlert_error">Error: {isError}</div>;
  }

  const alerts = data?.alerts?.alert || [];

  const handleBellClick = (): void => {
    if (alerts.length === 0) {
      toast.error("No notifications", {
        duration: 4000,
        id: "No_Notification",
      });
    } else {
      toast(
        (t) => (
          <div data-testid="manual_notify">
            <div className="flex justify-end">
              <Button
                onClick={() => toast.dismiss(t.id)}
                className=""
                icon={<RxCross2 size={24} />}
                description=""
              />
            </div>
            <div className="overflow-y-scroll h-96">
              {alerts.map((e, index) => (
                <div
                  key={index}
                  className=" bg-white bg-opacity-15 p-2 mt-1 rounded-md"
                >
                  <h2 className="text-2xl">{e.headline}</h2>
                  <h1 className="text-red-500 my-1">{e.category} !</h1>
                  <div className="text-sm">
                    {e.desc
                      .trim()
                      .split("*")
                      .map((line, i) => (
                        <p key={i} className="text-sm mb-1">
                          {line.trim()}
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
        { duration: Infinity, id: "Notification" },
      );
    }
  };

  return (
    <div data-testid="weatherAlert_component">
      <Toaster
        toastOptions={{
          className:
            "bg-white backdrop-blur-xl bg-opacity-50 text-black dark:text-white",
        }}
      />
      <Button
        testid="bell_btn"
        className=""
        description=""
        onClick={handleBellClick}
        icon={<BiBell color="white" size={26} />}
      />
    </div>
  );
};

export default WeatherAlert;

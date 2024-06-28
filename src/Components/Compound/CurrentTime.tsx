import React, { useEffect } from "react";
import dayjs from "dayjs";

interface TimeProps {
  className: string;
}

const CurrentTime: React.FC<TimeProps> = ({ className = "" }) => {
  const [currentTime, setCurrentTime] = React.useState<string>(
    dayjs().format("h:mm A"),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("h:mm A"));
    }, 60000);

    return () => clearInterval(interval);
  }, [currentTime]);

  return <span className={className}>{currentTime}</span>;
};
export default CurrentTime;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useWeatherContext } from "../../Context/WeatherContext";
import convertKelvinToCelsius, {
  getDayOfWeek,
} from "../../HelperFunctions/Helper";

const TemperatureChart: React.FC = () => {
  const { weatherForecastData, searchCity } = useWeatherContext();

  if (!weatherForecastData && !searchCity) {
    return <h1>No city searched</h1>;
  }
  if (!weatherForecastData) {
    return <h1>Loading</h1>;
  }
  const TemperatureData2 = weatherForecastData?.map((e) => ({
    day: getDayOfWeek(e.dt_txt),
    temperature: parseFloat(
      convertKelvinToCelsius(e.main.temp)?.toFixed() ?? "0",
    ),
  }));
  const formatYAxis = (tick: number): string => `${tick}°C`;
  return (
    <div className="w-96">
      <ResponsiveContainer width="90%" height={270}>
        <BarChart data={TemperatureData2}>
          <CartesianGrid stroke="black" strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fill: "black" }} />
          <YAxis tick={{ fill: "black" }} tickFormatter={formatYAxis} />
          <Tooltip cursor={{ fill: "none", stroke: "red" }} />
          <Legend />
          <Bar dataKey="temperature" fill="#3d1d5e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;

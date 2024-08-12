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
  const { weatherForecastData } = useWeatherContext();
  const TemperatureData2 = weatherForecastData?.map((e) => ({
    day: getDayOfWeek(e.dt_txt),
    temperature: parseFloat(
      convertKelvinToCelsius(e.main.temp)?.toFixed() ?? "0",
    ),
  }));

  const formatYAxis = (tick: number): string => `${tick}°C`;

  return (
    <div data-testid="TemperatureChart" className="w-96">
      <ResponsiveContainer width="90%" height={270}>
        <BarChart data={TemperatureData2} id="Bargraph">
          <CartesianGrid
            id="cartesian_grid"
            stroke="rgba(255, 255, 255, 0)"
            strokeDasharray="3 3"
          />

          <XAxis
            id="Xaxis"
            stroke="white"
            dataKey="day"
            tick={{ fill: "white" }}
          />
          <YAxis
            id="Yaxis"
            tick={{ fill: "white" }}
            tickFormatter={formatYAxis}
            stroke="white"
          />
          <Tooltip
            labelStyle={{ fill: "red", color: "black" }}
            itemStyle={{ fill: "red", color: "black" }}
            cursor={{ fill: "none", stroke: "rgba(255, 255, 255, 0.4)" }}
          />
          <Legend />
          <Bar dataKey="temperature" fill="rgba(255, 255, 255, 0.5)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;

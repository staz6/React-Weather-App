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
import { useTheme } from "../../Context/ThemeChangerContext";

const TemperatureChart: React.FC = () => {
  const { weatherForecastData } = useWeatherContext();
  const { Darktheme } = useTheme();
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
            stroke={`${Darktheme ? "white" : "black"}`}
            strokeDasharray="3 3"
          />
          <XAxis
            id="Xaxis"
            dataKey="day"
            tick={{ fill: `${Darktheme ? "white" : "black"}` }}
          />
          <YAxis
            id="Yaxis"
            tick={{ fill: `${Darktheme ? "white" : "black"}` }}
            tickFormatter={formatYAxis}
          />
          <Tooltip cursor={{ fill: "none", stroke: "red" }} />
          <Legend />
          <Bar
            dataKey="temperature"
            fill={`${Darktheme ? "#001e99" : "#3d1d5e"}`}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;

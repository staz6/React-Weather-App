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

interface TemperatureData {
  day: string;
  temperature: number;
}

const temperatureData: TemperatureData[] = [
  { day: "Day 1", temperature: 25 },
  { day: "Day 2", temperature: 27 },
  { day: "Day 3", temperature: 22 },
  { day: "Day 4", temperature: 20 },
  { day: "Day 5", temperature: 23 },
];

const TemperatureChart: React.FC = () => {
  const formatYAxis = (tick: number): string => `${tick}°C`;

  return (
    <div className="w-96">
      <ResponsiveContainer width="90%" height={270}>
        <BarChart data={temperatureData}>
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

import React from "react";
import Layout from "./Components/Layout/Layout";
import { MemoizedWeatherContextProvider } from "./Context/WeatherContext";

const App: React.FC = () => (
  <MemoizedWeatherContextProvider>
    <Layout />;
  </MemoizedWeatherContextProvider>
);

export default App;

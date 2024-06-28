import React from "react";
import Layout from "./Components/Layout/Layout";
import { MemoizedWeatherContextProvider } from "./Context/WeatherContext";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

const App: React.FC = () => (
  <MemoizedWeatherContextProvider>
    <Layout />
  </MemoizedWeatherContextProvider>
);

export default App;

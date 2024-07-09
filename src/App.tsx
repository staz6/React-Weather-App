import React from "react";
import Layout from "./Components/Layout/Layout";
import { MemoizedWeatherContextProvider } from "./Context/WeatherContext";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import ThemeContextProvider from "./Context/ThemeChangerContext";

const App: React.FC = () => (
  <ThemeContextProvider>
    <MemoizedWeatherContextProvider>
      <Layout />
    </MemoizedWeatherContextProvider>
  </ThemeContextProvider>
);

export default App;

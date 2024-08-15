import React from "react";
import Layout from "./Components/Layout/Layout";
import { MemoizedWeatherContextProvider } from "./Context/WeatherContext";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import { ThemeProvider } from "./Context/ThemeChangerContext";

const App: React.FC = () => (
  <ThemeProvider>
    <MemoizedWeatherContextProvider>
      <Layout />
    </MemoizedWeatherContextProvider>
  </ThemeProvider>
);

export default App;

// WeatherApp.js
import React from "react";
import { WeatherProvider } from "../context/Weather";
import WeatherDisplay from "./WeatherDisplay";

const WeatherApp = () => {
  return (
    <WeatherProvider>
      <WeatherDisplay />
    </WeatherProvider>
  );
};

export default WeatherApp;

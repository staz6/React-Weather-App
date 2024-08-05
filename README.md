# Weather App

Weather App build on React and Typescript

## Getting Started

### Prerequisite

- Node
- npm

### Installing

- git clone the repository
- cd in to repository folder and run `npm install`

# To Start Project

- run `npm start`

# To Run Unit Tests and End-2-End Tests

- run `npm run test` (for unit tests)
- run `npx cypress open` (for end-2-end tests)

## Features List

- [x] Initial design
- [x] Current location
- [x] Current Weather and forecast
- [x] Weather Alerts
- [x] Theme Changer
- [x] Add To Favorites and Quick Search
- [x] Lazy Loading
- [x] End-2-End Test
- [x] Unit Tests
- [x] Responsive

## Authors

Muhammad Aahad  
[@Muhammad Aahad](https://www.linkedin.com/in/muhammad-aahad-568aaa179/)

## Documentation for Custom Hooks

### Custom Hook 1: `useCityNameFetch`

- **Location:** `src/CustomeHooks/CurrentLocationHook.tsx`
- **Description:**
  - This hook uses **TanStack Query** and takes latitude and longitude values as parameters.
  - It provides the city name based on the lat and lon values.
  - Additionally, the hook also provides a loading state.
  - The query in the hook is disabled if lat and lon values are 0.
  - This hook uses the **OpenWeatherMap API** for fetching data.
- **Use Case:**
  - Used in the **CurrentLocation** component located at `src/Components/Compound/CurrentLocation. tsx`

### Custom Hook 2: `useCurrentWeather`

- **Location:** `src/CustomeHooks/CurrentWeatherHook.tsx`
- **Description:**
  - This hook uses **TanStack Suspense Query** and takes the city name as a parameter.
  - It provides the current weather data based on the city.
  - Additionally, it provides the loading, error, and success states.
  - This hook uses the **OpenWeatherMap API** and **Axios** for fetching data.
- **Use Case:**
  - Used in the **CurrentWeatherCard** component located at `src/Components/Compound/CurrentWeatherCard.tsx`

### Custom Hook 3: `useWeatherAlert`

- **Location:** `src/CustomeHooks/WeatherAlertHook.tsx`
- **Description:**
  - This hook uses **TanStack Query** and takes the city name as a parameter.
  - It provides the weather alerts data based on the city.
  - Additionally, it provides the loading and error states.
  - This hook uses the **WeatherAPI** for fetching data.
  - It is disabled if the city name is an empty string.
- **Use Case:**
  - Used in the **WeatherAlert** component located at `src/Components/Compound/WeatherAlert.tsx`

### Custom Hook 4: `useWeatherForecast`

- **Location:** `src/CustomeHooks/WeatherForecastHook.tsx`
- **Description:**
  - This hook uses **TanStack Suspense Query** and takes the city name as a parameter.
  - It provides the complete forecast data and filtered data (which is used in weather forecast items).
  - Additionally, it provides the loading, success, and error states.
  - This hook uses **Axios** and the **OpenWeatherMap API**.
- **Use Case:**
  - Used in the **WeatherForecastCard** component located at `src/Components/Compound/ WeatherForecastCard.tsx`

To run this project use the following command:

1- npm run dev

To perform unit tests use the following commands:

1- jest "filename.tsx" for running test of single file

2- npm run test for running all the tests all together.

To perform end-2-end testing run the following commands:

1-npx cypress open - This opens the Cypress software. Select end-to-end testing, and all
tests will run visually.

2-npm run cypress - Runs the tests in the command line interface.
From the above two commands it is recommended to run the first one.

Documentation for Custom Hooks :

There are total of 4 custom hooks used in the application:

1-useCityNameFetch

    Location:"src/CustomeHooks/CurrentLocationHook.tsx"

    Description: This hook uses TanStack Query and takes latitude and longitude values as parameters. It provides the city name based on the lat and lon values. Additionally, the hook also provides a loading state. The query in the hook is disabled if lat and lon values are 0.
    This hook uses OpenWeatherMap api fetching data.

    Use Case: Used in the CurrentLocation component located at "src/Components/Compound/CurrentLocation.tsx"

2-UseCurrentWeather

    Location:"src/CustomeHooks/CurrentWeatherHook.tsx"

    Description: This hook uses Tanstack suspense query and takes city name as parameters. It provides the current weather data based on city. Additionally it provides the loading , error and success state. This hooks uses OpenWeatherMap api and axios for fetching data.

    Use Case: Used in CurrentWeatherCard component located at "src/Components/Compound/CurrentWeatherCard.tsx"

3-useWeatherAlert

    Location:"src/CustomeHooks/WeatherAlertHook.tsx"

    Description: This hook uses Tanstack query and takes city name as parameters. It provides the weahter alerts data based on city. Additionally it provides the loading , error state. This hooks uses Weatherapi api for fetching data. It is disabled if cityname is an empty string

    Use Case: Used in WeatherAlert component located at "src/Components/Compound/WeatherAlert.tsx"

3-useWeatherForecast

    Location:"src/CustomeHooks/WeatherForecastHook.tsx"

    Description: This hook uses Tanstack suspense query and takes city name as parameters. It provides the complete forecast data and filetered data (which we are using in weatherforecastitem).Additionally it provides loading , success and error state. This hook uses axios and OpenWeatherMap api.

    Use Case: Used in WeatherForecastCard component located at "src/Components/Compound/CurrentWeatherCard.tsx"

const searchCityUsingInput = (): void => {
  cy.visit("http://localhost:5173/");
  const InputButton = cy
    .get('[data-testid="searchcity_input"]')
    .should("exist");
  cy.get('[data-testid="location_btn"]').should("exist");
  InputButton.click();
  const SearchInput = cy.get('[placeholder="Enter City"]');
  SearchInput.type("California");
  InputButton.click();
};

const useThemeChanger = (): void => {
  const ThemeChangerBtn = cy
    .get('[data-testid="ThemeChanger"]')
    .should("exist");
  cy.get("html").should("not.have.class", "dark");
  ThemeChangerBtn.click();
  cy.get("html").should("have.class", "dark");
  ThemeChangerBtn.click();
  cy.get("html").should("not.have.class", "dark");
};

const useAddToFav = (): void => {
  const AddToFavBtn = cy.get('[data-testid="FavCity"]').should("exist");
  AddToFavBtn.click();
  const InputButton = cy
    .get('[data-testid="searchcity_input"]')
    .should("exist");
  InputButton.click();
};
const useSelectForecastDay = (): void => {
  cy.get('[data-testid="WeatherForecastItem"]')
    .should("have.length.greaterThan", 1)
    .eq(1)
    .click()
    .then(() => {
      cy.get('[data-testid="forecast_temp"]')
        .eq(1)
        .invoke("text")
        .then((selectedForecastTemp: string) => {
          cy.get('[data-testid="temperature"]')
            .invoke("text")
            .then((currentWeatherTemp: string) => {
              const normalizeTemp = (temp: string): string =>
                temp.replace(/\s+/g, "");

              const normalizedSelectedForecastTemp =
                normalizeTemp(selectedForecastTemp);
              const normalizedCurrentWeatherTemp = normalizeTemp(
                currentWeatherTemp.trim(),
              );
              assert.equal(
                normalizedSelectedForecastTemp,
                normalizedCurrentWeatherTemp,
                "Temperatures should match",
              );
            });
        });
    });
};
describe("Weather App End-2-End testing", () => {
  it("Displaying ui on initial page load", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("No City Searched").should("exist");
    const notification = cy.get('[data-testid="bell_btn"]');
    notification.click();
    cy.contains("No notifications");
    cy.contains("Loading CurrentWeather").should("not.exist");
    cy.contains("Loading Temperature Chart").should("not.exist");
    cy.contains("Loading ").should("not.exist");
    cy.contains("loading weather metrics").should("not.exist");
    cy.contains("Loading Forecast").should("not.exist");
    cy.get('[data-testid="WeatherIcon"]').should("not.exist");
    cy.get('[data-testid="temperature"]').should("not.exist");
    cy.get('[data-testid="TemperatureChart"]').should("not.exist");
    cy.get('[data-testid="sunevent"]').should("not.exist");
    cy.get('[data-testid="WeatherMetricsCard"]').should("not.exist");
    cy.get('[data-testid="WeatherForecastItem"]').should("not.exist");
  });
  it("Searching city using input searchbar and testing website behaviour from user perspective", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testid="ThemeChanger"]').should("exist");
    searchCityUsingInput();
    cy.contains("Loading CurrentWeather").should("exist");
    cy.contains("Loading Temperature Chart").should("exist");
    cy.contains("Loading ").should("exist");
    cy.contains("loading weather metrics").should("exist");
    cy.contains("Loading Forecast").should("exist");
    cy.get('[data-testid="WeatherIcon"]').should("exist");
    cy.get('[data-testid="temperature"]').should("exist");
    cy.get('[data-testid="TemperatureChart"]').should("exist");
    cy.get('[data-testid="sunevent"]').should("exist");
    cy.get('[data-testid="WeatherMetricsCard"]').should("exist");
    cy.get('[data-testid="WeatherForecastItem"]').should("exist");
  });

  it("using addTofavorite feature and themechanger", () => {
    searchCityUsingInput();
    useAddToFav();
    cy.contains("1. California");
    useThemeChanger();
  });
  it("using display selected day's forecast data on selecting day ", () => {
    searchCityUsingInput();
    cy.scrollTo("bottom");
    useSelectForecastDay();
  });
  it("Using current location and testing all features", () => {
    cy.visit("http://localhost:5173/");
    cy.setGeolocation(37.7749, -122.4194);
    const CurrentLocationBtn = cy
      .get('[data-testid="location_btn"]')
      .should("exist");
    CurrentLocationBtn.click();
    cy.contains("San Francisco");
    cy.contains("Loading CurrentWeather").should("exist");
    cy.contains("Loading Temperature Chart").should("exist");
    cy.contains("Loading ").should("exist");
    cy.contains("loading weather metrics").should("exist");
    cy.contains("Loading Forecast").should("exist");
    cy.get('[data-testid="WeatherIcon"]').should("exist");
    cy.get('[data-testid="temperature"]').should("exist");
    cy.get('[data-testid="TemperatureChart"]').should("exist");
    cy.get('[data-testid="sunevent"]').should("exist");
    cy.get('[data-testid="WeatherMetricsCard"]').should("exist");
    cy.get('[data-testid="WeatherForecastItem"]').should("exist");
  });
});

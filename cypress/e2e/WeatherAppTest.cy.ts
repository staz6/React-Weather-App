const searchCityUsingInput = (city: string): void => {
  const SearchInput = cy.get("input.SearchInput");
  SearchInput.clear().type(city);
};
const useNotification = (): void => {
  const notificationBtn = cy.get('[data-testid="bell_btn"]').should("exist");
  notificationBtn.click();
};
const showWeatherResults = (): void => {
  cy.get('[data-testid="WeatherIcon"]').should("exist");
  cy.get('[data-testid="temperature"]').should("exist");
  cy.get('[data-testid="TemperatureChart"]').should("exist");
  cy.get('[data-testid="sunevent"]').should("exist");
  cy.get('[data-testid="WeatherMetricsCard"]').should("exist");
  cy.get('[data-testid="WeatherForecastItem"]').should("exist");
};
const useLazyloading = (visibility: string): void => {
  cy.contains("Loading CurrentWeather").should(visibility);
  cy.contains("Loading Temperature Chart").should(visibility);
  cy.contains("Loading ").should(visibility);
  cy.contains("loading weather metrics").should(visibility);
  cy.contains("Loading Forecast").should(visibility);
  cy.get('[data-testid="WeatherIcon"]').should(visibility);
  cy.get('[data-testid="temperature"]').should(visibility);
  cy.get('[data-testid="TemperatureChart"]').should(visibility);
  cy.get('[data-testid="sunevent"]').should(visibility);
  cy.get('[data-testid="WeatherMetricsCard"]').should(visibility);
  cy.get('[data-testid="WeatherForecastItem"]').should(visibility);
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

const ClickInputButton = (): void => {
  const InputButton = cy
    .get('[data-testid="searchcity_input"]')
    .should("exist");
  InputButton.click();
};

const useAddToFav = (): void => {
  const AddToFavBtn = cy.get('[data-testid="FavCity"]').should("exist");
  AddToFavBtn.click();
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
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("Displaying ui on initial page load", () => {
    cy.contains("No City Searched").should("exist");
    useNotification();
    useLazyloading("not.exist");
  });
  it("Searching city using input searchbar and testing website behaviour from user perspective", () => {
    cy.get('[data-testid="ThemeChanger"]').should("exist");
    cy.get('[data-testid="location_btn"]').should("exist");
    ClickInputButton();
    searchCityUsingInput("California");
    ClickInputButton();
    useLazyloading("exist");
    showWeatherResults();
  });

  it("using addTofavorite feature and themechanger", () => {
    ClickInputButton();
    searchCityUsingInput("California");
    ClickInputButton();
    useAddToFav();
    ClickInputButton();
    cy.contains("1. California");
    searchCityUsingInput("Karachi");
    ClickInputButton();
    useAddToFav();
    ClickInputButton();
    cy.get('[data-testid="favcitylist"]').first().click();
    ClickInputButton();
    useThemeChanger();
  });
  it("using display selected day's forecast data on selecting day ", () => {
    ClickInputButton();
    searchCityUsingInput("California");
    ClickInputButton();
    cy.scrollTo("bottom");
    useSelectForecastDay();
  });
  it("Using current location and testing all features", () => {
    cy.intercept("GET", "http://api.weatherapi.com/v1/forecast.json*", {
      statusCode: 200,
      body: {
        alerts: {
          alert: [
            {
              category: "Weather",
              headline: "Heavy Rain Expected",
              desc: "There will be heavy rain in Test City today.",
            },
            {
              category: "Warning",
              headline: "Strong Winds Alert",
              desc: "Strong winds are expected in Test City today.",
            },
          ],
        },
      },
    }).as("getWeatherAlerts");
    cy.setGeolocation(37.7749, -122.4194);
    const CurrentLocationBtn = cy
      .get('[data-testid="location_btn"]')
      .should("exist");
    CurrentLocationBtn.click();
    useLazyloading("exist");
    cy.get('[data-testid="auto_notify"]').should("exist");
    cy.get('[data-testid="auto_notify_Btn"]')
      .should("exist")
      .click({ multiple: true });
    showWeatherResults();
    useNotification();
    cy.get('[data-testid="manual_notify"]').should("exist");
    cy.get('[data-testid="manual_notify_Btn"]').should("exist").click();
  });
});

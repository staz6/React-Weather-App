const searchCityUsingInput = (city: string): void => {
  const SearchInput = cy.get("input.SearchInput");
  SearchInput.clear().type(city);
};
const useCurrenLocation = (): void => {
  cy.setGeolocation(37.7749, -122.4194);
  const CurrentLocationBtn = cy
    .get('[data-testid="location_btn"]')
    .should("exist");
  CurrentLocationBtn.click();
  cy.contains("San Francisco");
};
const showWeatherResults = (visibility: string): void => {
  cy.get('[data-testid="WeatherIcon"]').should(visibility);
  cy.get('[data-testid="temperature"]').should(visibility);
  cy.get('[data-testid="TemperatureChart"]').should(visibility);
  cy.get('[data-testid="sunevent"]').should(visibility);
  cy.get('[data-testid="WeatherMetricsCard"]').should(visibility);
  cy.get('[data-testid="WeatherForecastItem"]').should(visibility);
};
const useLazyloading = (visibility: string): void => {
  cy.contains("Loading CurrentWeather").should(visibility);
  cy.contains("Loading Temperature Chart").should(visibility);
  cy.contains("Loading ").should(visibility);
  cy.contains("loading weather metrics").should(visibility);
  cy.contains("Loading Forecast").should(visibility);
};

const useThemeChanger = (): void => {
  const ThemeChangerBtn = cy
    .get('[data-testid="ThemeChanger"]')
    .should("exist");
  ThemeChangerBtn.click();
};

const ClickInputButton = (): void => {
  const InputButton = cy
    .get('[data-testid="searchcity_input"]')
    .should("exist");
  InputButton.click();
};

const useNotification = (): void => {
  const notificationBtn = cy.get('[data-testid="bell_btn"]').should("exist");
  notificationBtn.click();
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

const closeAutoNotifications = (): void => {
  const notificationBtn = cy
    .get('[data-testid="auto_notify_Btn"]')
    .should("exist");
  notificationBtn.click({ multiple: true });
};
const closeManualNotifications = (): void => {
  const notificationBtn = cy
    .get('[data-testid="manual_notify_Btn"]')
    .should("exist");
  notificationBtn.click();
};

describe("Weather App End-2-End testing", () => {
  it("Testing website functionality and features ", () => {
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

    cy.visit("http://localhost:5173/");
    showWeatherResults("not.exist");
    useLazyloading("not.exist");
    useNotification();
    cy.contains("No notifications");
    ClickInputButton();
    searchCityUsingInput("Berlin");
    ClickInputButton();
    useLazyloading("exist");
    showWeatherResults("exist");
    useAddToFav();
    closeAutoNotifications();
    useThemeChanger();
    cy.get("html").should("have.class", "dark");
    cy.get("html").should("have.class", "dark");
    cy.wait(500);
    cy.scrollTo("bottom");
    useSelectForecastDay();
    cy.scrollTo("top");
    useCurrenLocation();
    useLazyloading("exist");
    showWeatherResults("exist");
    closeAutoNotifications();
    useNotification();
    closeManualNotifications();
    ClickInputButton();
    cy.get('[data-testid="favcitylist"]').first().click();
    ClickInputButton();
    closeAutoNotifications();
    showWeatherResults("exist");
    useThemeChanger();
    cy.get("html").should("not.have.class", "dark");
  });
  it("Testing errors", () => {
    cy.visit("http://localhost:5173/");
    cy.on("uncaught:exception", (): boolean => false);
    ClickInputButton();
    searchCityUsingInput("fdsafdaf");
    ClickInputButton();
    useLazyloading("exist");
    showWeatherResults("not.exist");
    cy.wait(8000);
    cy.contains("Please Make Sure Such City Exists");
  });
});

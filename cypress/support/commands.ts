/// <reference types="cypress" />

Cypress.Commands.add(
  "setGeolocation",
  (latitude: number, longitude: number) => {
    cy.window().then((win) => {
      cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
        (successCallback: (position: GeolocationPosition) => void) => {
          successCallback({
            coords: {
              latitude,
              longitude,
            },
            timestamp: Date.now(),
          } as GeolocationPosition);
        },
      );
    });
  },
);

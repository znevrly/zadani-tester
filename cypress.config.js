const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
    isolation: true
  },
  // Allow running tests with different domains via CLI
  // Usage: npx cypress open --env domain=cz
  // or: npx cypress run --env domain=cz
  domain: 'cz',
  domains: {
    cz: {
      baseUrl: 'https://dev.fakturaonline.cz',
      apiBaseUrl: 'api.fakturaonline.cz'
    },
    com: {
      baseUrl: 'https://dev.invoiceonline.com',
      apiBaseUrl: 'api.invoiceonline.com'
    },
    sk: {
      baseUrl: 'https://dev.fakturaonline.sk',
      apiBaseUrl: 'api.fakturaonline.sk'
    }
  }
});

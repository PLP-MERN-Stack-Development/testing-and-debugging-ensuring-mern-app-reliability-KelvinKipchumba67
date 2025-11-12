// client/cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // set the base URL, so we don't have to type it in every test
    baseUrl: 'http://localhost:5174',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
// cypress/support/flows/authFlow.js

export class AuthFlow {
    constructor(domain) {
      this.domain = domain;
    }
  
    login() {
      const baseUrl = Cypress.config('domains')[this.domain].baseUrl;
      cy.visit(`${baseUrl}/prihlaseni`);
      
      // Check if the sign-in button exists and click it if present
      cy.get('body').then($body => {
        if ($body.find('button[data-analytics-id="signIn.v2.login"]').length > 0) {
          cy.get('button[data-analytics-id="signIn.v2.login"]')
            .should('be.visible')
            .click();
        }
      });
      
      // Wait for the form to appear and fill it
      cy.get('input[name="email"]')
        .should('be.visible')
        .should('exist')
        .type(Cypress.env('roleUser1').email);
      cy.get('input[name="password"]').type(Cypress.env('roleUser1').password);
      cy.get('button[data-analytics-id="button.login"]').click();
      
      return this;
    }
}
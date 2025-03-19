// cypress/support/flows/authFlow.js

export class AuthFlow {
    constructor(domain) {
      this.domain = domain;
    }
  
    login() {
      const baseUrl = Cypress.config('domains')[this.domain].baseUrl;
      cy.visit(`${baseUrl}/prihlaseni`);
      
      // First check for the "Přihlásit se do mého účtu" button
      cy.get('button[data-analytics-id="signIn.v2.login"]')
        .should('be.visible')
        .should('exist')
        .click();
      
      // Wait for the form to appear and fill it
      cy.get('input[name="email"]')
        .should('be.visible')
        .should('exist')
        .type('tesla2051@seznam.cz');
      cy.get('input[name="password"]').type('28ECZ');
      cy.get('button[data-analytics-id="button.login"]').click();
      
      return this;
    }
}
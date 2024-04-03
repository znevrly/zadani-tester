

  Cypress.Commands.add('visitOnDomain', (args, domain = Cypress.env('currentDomain')) => {
    const customVisitCommand = `visit${domain.charAt(0).toUpperCase()}${domain.slice(1)}`;
    cy[customVisitCommand](args);
  });

  Cypress.Commands.add('visitCz', (args) => {
    cy.visit(`https://dev.fakturaonline.cz${args}`);
  });

  Cypress.Commands.add('visitCom', (args) => {
    cy.visit(`https://dev.invoiceonline.com${args}`);
  });

  Cypress.Commands.add('visitSk', (args) => {
    cy.visit(`https://dev.fakturaonline.sk${args}`);
  });

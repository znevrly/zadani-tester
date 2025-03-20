Cypress.Commands.add('deleteAllContacts', () => {
  cy.get('.el-table', { timeout: 10000 }).then($table => {
    if ($table.length > 0) {
      cy.get('[data-analytics-id="icon-trash-alt"]', { timeout: 10000 }).then($deleteButtons => {
        if ($deleteButtons.length > 0) {
          cy.wrap($deleteButtons).each(($deleteButton) => {
            cy.wrap($deleteButton).click({ force: true });
            cy.get('[data-analytics-id="confirmButtonTitle"]').click();
          });
        }
      });
    }
  });
});

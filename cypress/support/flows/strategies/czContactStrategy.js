import { ContactStrategy } from './contactStrategy';

export class CzContactStrategy extends ContactStrategy {
  
  navigateToContacts() {
    cy.get('.navigation__button').contains('Kontakty').click();
    cy.get('[data-test="contacts-list"]').should('be.visible');
    return this;
  }

  afterFillContactForm(contactData) {
    return this;
  }
}
import { ContactStrategy } from './contactStrategy';

export class CzContactStrategy extends ContactStrategy {
  
  navigateToContacts() {
    cy.get('.navigation__button').contains('Kontakty').click();
    return this;
  }

  afterFillContactForm(contactData) {
    return this;
  }
}
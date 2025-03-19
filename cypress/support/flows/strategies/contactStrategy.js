export class ContactStrategy {
    constructor(domain) {
      this.domain = domain;
    }
  
    navigateToContacts() {
      throw new Error('Method not implemented');
    }
  
    createNewContact(contactData) {
      return this
        .navigateToContacts()
        .clickCreateNew()
        .fillContactForm(contactData)
        .saveContact()
        .afterSaveContact(contactData);
    }

    clickCreateNew() {
      cy.get('[data-test="create-contact-button"]').click();
      cy.get('[data-test="contact-form"]').should('be.visible');
      return this;
    }

    fillContactForm(contactData) {
      cy.get('[data-test="contact-form"]').within(() => {
        cy.get('[data-test="contact-name-input"]').clear().type(contactData.name);
        cy.get('[data-test="contact-email-input"]').clear().type(contactData.email);
        cy.get('[data-test="contact-phone-input"]').clear().type(contactData.phone);
      });
      return this;
    }

    saveContact() {
      cy.get('[data-test="save-contact-button"]').click();
      cy.get('[data-test="contacts-list"]').should('be.visible');
      return this;
    }
  
    // Hook methods
    afterSaveContact(contactData) {}
  }
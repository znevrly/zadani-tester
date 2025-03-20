import { ContactFlow } from '../../support/flows/contactFlow';
import { AuthFlow } from '../../support/flows/authFlow';

describe('Contact Management Flows', () => {
  // Get domain from CLI parameter or use default
  const domain = Cypress.env('domain') || 'cz';
  
  describe(`on ${domain} domain`, () => {
    let contactFlow;

    beforeEach(() => {
      contactFlow = new ContactFlow(domain);
      const authFlow = new AuthFlow(domain);
      authFlow.login();
      contactFlow.navigateToContacts();
      //cy.deleteAllContacts(); refesh BUG here
    });

    it('should create new contact', () => {
      cy.fixture(`${domain}/contacts.json`).then((contacts) => {
        contactFlow.createNewContact(contacts.testContact);
      });
    });

    it('should create another contact', () => {
      cy.fixture(`${domain}/contacts.json`).then((contacts) => {
        contactFlow.createNewContact(contacts.anotherContact);
      });
    });

    it('should search for contact', () => {
      cy.fixture(`${domain}/contacts.json`).then((contacts) => {
        contactFlow.createNewContact(contacts.testContact);
        contactFlow.searchContact(contacts.testContact.companyName);
        cy.get('.el-table__row')
          .should('contain', contacts.testContact.companyName);
      });
    });

    it('should sort contacts by company name', () => {
      cy.fixture(`${domain}/contacts.json`).then((contacts) => {
        contactFlow.createNewContact(contacts.testContact);
        contactFlow.createNewContact(contacts.anotherContact);
        
        contactFlow.sortByColumn('name', 'asc');
        
        cy.get('.el-table__row').first()
          .should('contain', contacts.anotherContact.companyName);
        
        contactFlow.sortByColumn('name', 'desc');
        
        cy.get('.el-table__row').first()
          .should('contain', contacts.testContact.companyName);
      });
    });

    it('should edit existing contact', () => {
      cy.fixture(`${domain}/contacts.json`).then((contacts) => {
        contactFlow.createNewContact(contacts.testContact);
        
        contactFlow.editContact(contacts.testContact.companyName);
        
        const updatedContact = {
          ...contacts.testContact,
          companyName: 'Updated Company Name',
          email: 'updated@example.com'
        };
        
        contactFlow.fillContactForm(updatedContact);
        contactFlow.saveContact();

        cy.get('.el-table__row')
          .should('contain', updatedContact.companyName)
          .and('contain', updatedContact.email);
      });
    });
  });
});
import { ContactFlow } from '../../support/flows/contactFlow';
import { AuthFlow } from '../../support/flows/authFlow';

describe('Contact Management Flows', () => {
  // Get domain from CLI parameter or use default
  const domain = Cypress.env('domain') || 'cz';
  
  describe(`on ${domain} domain`, () => {
    let contactFlow;

    beforeEach(() => {
      const authFlow = new AuthFlow(domain);
      contactFlow = new ContactFlow(domain);
      authFlow.login();
    });

    it('should create new contact', () => {
      cy.fixture(`${domain}/contacts.json`).then((contacts) => {
        contactFlow.createNewContact(contacts.testContact);
      });
    });
  });
});
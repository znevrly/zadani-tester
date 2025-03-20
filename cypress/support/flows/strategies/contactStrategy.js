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

    searchContact(searchTerm) {
        cy.get('input[data-analytics-id="contactsTable.filters.search"]')
            .should('be.visible')
            .clear()
            .type(searchTerm);
        return this;
    }

    sortByColumn(columnName, direction = 'asc') {
        cy.get(`.el-table__header th[data-analytics-id="contactsTable.columns.${columnName}"]`)
            .should('be.visible')
            .click();
        
        // If direction is desc, click again to reverse the sort
        if (direction === 'desc') {
            cy.get(`.el-table__header th[data-analytics-id="contactsTable.columns.${columnName}"]`)
                .click();
        }
        return this;
    }

    editContact(contactName) {
        cy.get('.el-table__row')
            .contains(contactName)
            .parent('tr')
            .find('button[data-analytics-id="contactsTable.buttons.edit"]')
            .click();
        return this;
    }

    clickCreateNew() {
        cy.get('button[data-analytics-id="contactsTable.buttons.addContact"]')
            .should('be.visible')
            .should('exist')
            .click();
        return this;
    }

    fillContactForm(contactData) {
        cy.get('form.el-form').within(() => {
            cy.get('input[name="invoice_attributes_name"]').clear().type(contactData.companyName || ' ');
            cy.get('input[id="invoice_attributes_company_number"]').clear().type(contactData.companyNumber || ' ');
            cy.get('input[id="invoice_attributes_tax_number"]').clear().type(contactData.taxNumber || ' ');
            cy.get('.vue-tel-input input').clear().type(contactData.phone || ' ');
            cy.get('input[name="email"]').clear().type(contactData.email || ' ');
            cy.get('input[name="web"]').clear().type(contactData.web || ' ');
        });
        return this;
    }

    saveContact() {
        cy.get('button[data-analytics-id="contacts.buttons.save"]')
            .should('be.visible')
            .should('exist')
            .click();
        return this;
    }

    // Hook methods
    afterSaveContact(contactData) { }
}
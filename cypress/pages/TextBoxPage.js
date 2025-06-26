class TextBoxPage {
    // Selectors for input fields
    inputElements = {
        fullNameInput: () => cy.get('#userName'),
        emailInput: () => cy.get('#userEmail'),
        currentAddressInput: () => cy.get('#currentAddress'),
        permanentAddressInput: () => cy.get('#permanentAddress'),
        submitButton: () => cy.get('#submit')
    }

    // Selectors for output fields
    outputElements = {
        container: () => cy.get('#output'),
        name: () => cy.get('#output #name'),
        email: () => cy.get('#output #email'),
        currentAddress: () => cy.get('#output p#currentAddress'),
        permanentAddress: () => cy.get('#output p#permanentAddress')
    }
    
    // Actions
    visit() {
        // Get the textBoxUrl from environment variables
        const textBoxUrl = Cypress.env('textBoxUrl');
        cy.visit(textBoxUrl, {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear();
                win.localStorage.clear();
            },
            failOnStatusCode: false
        });
        // Wait for the page to load completely
        cy.get('body').should('be.visible');
    }

    fillFullName(name) {
        this.inputElements.fullNameInput().should('be.visible').clear().type(name);
    }

    fillEmail(email) {
        this.inputElements.emailInput().should('be.visible').clear().type(email);
    }

    fillCurrentAddress(address) {
        this.inputElements.currentAddressInput().should('be.visible').clear().type(address);
    }

    fillPermanentAddress(address) {
        this.inputElements.permanentAddressInput().should('be.visible').clear().type(address);
    }

    clickSubmit() {
        this.inputElements.submitButton().should('be.visible').click();
        // Wait for the output container to be present and visible
        this.outputElements.container().should('exist').and('be.visible');
    }

    // Verifications
    verifySubmittedData(field, value) {
        // Add a small wait to ensure the output is fully rendered
        cy.wait(500);  // Add a small delay

        // First verify the output container exists
        this.outputElements.container()
            .should('exist')
            .and('be.visible')
            .then(() => {
                switch(field) {
                    case 'Name':
                        this.outputElements.name()
                            .should('be.visible')
                            .invoke('text')
                            .should('include', value);
                        break;
                    case 'Email':
                        this.outputElements.email()
                            .should('be.visible')
                            .invoke('text')
                            .should('include', value);
                        break;
                    case 'Current Address':
                        // Debug log to see what elements are found
                        cy.get('#output').then($output => {
                            cy.log('Current Address elements found:', $output.find('p#currentAddress').length);
                        });
                        this.outputElements.currentAddress()
                            .should('be.visible')
                            .invoke('text')
                            .should('include', value);
                        break;
                    case 'Permanent Address':
                        this.outputElements.permanentAddress()
                            .should('be.visible')
                            .invoke('text')
                            .should('include', value);
                        break;
                    default:
                        throw new Error(`Unknown field: ${field}`);
                }
            });
    }
}

export default new TextBoxPage(); 
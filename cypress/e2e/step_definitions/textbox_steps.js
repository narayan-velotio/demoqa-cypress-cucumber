import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import TextBoxPage from '../../pages/TextBoxPage';

Given('I navigate to the TextBox page', () => {
    TextBoxPage.visit();
});

When('I enter fullname {string}', (fullName) => {
    TextBoxPage.fillFullName(fullName);
});

When('I enter email {string}', (email) => {
    TextBoxPage.fillEmail(email);
});

When('I enter current address {string}', (address) => {
    TextBoxPage.fillCurrentAddress(address);
});

When('I enter permanent address {string}', (address) => {
    TextBoxPage.fillPermanentAddress(address);
});

When('I click the submit button', () => {
    TextBoxPage.clickSubmit();
});

Then('I should see the submitted data', (dataTable) => {
    // Convert the datatable to an array of objects
    const data = dataTable.hashes();
    
    // Debug: Log the entire output content
    cy.get('#output').then($output => {
        cy.log('Complete output content:', $output.html());
    });

    // Additional debug for address fields specifically
    cy.get('#output p#currentAddress').then($addr => {
        cy.log('Current Address element found:', $addr.length > 0);
        if ($addr.length > 0) {
            cy.log('Current Address text:', $addr.text());
        }
    });
    
    // Verify each field in the data table
    data.forEach(row => {
        cy.log(`Verifying field: ${row.field} with value: ${row.value}`);
        TextBoxPage.verifySubmittedData(row.field, row.value);
    });
}); 
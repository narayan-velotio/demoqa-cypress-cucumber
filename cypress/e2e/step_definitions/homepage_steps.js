import { Given, Then, After } from '@badeball/cypress-cucumber-preprocessor';

Given('I navigate to the DemoQA homepage', () => {
    // cy.visit('https://demoqa.com/');
    cy.visit()
});

Then('I should see the category cards section', () => {
    cy.get('.category-cards').should('be.visible');
});

After(() => {
    // Close the browser window after each scenario
    cy.window().then((win) => {
        win.close();
    });
}); 
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CheckboxPage from '../../pages/CheckboxPage';

Given('I navigate to the Checkbox page', () => {
    CheckboxPage.visit();
});

When('I expand all checkboxes', () => {
    CheckboxPage.expandAll();
});

When('I select all checkboxes', () => {
    CheckboxPage.selectAll();
});

When('I expand {string} section', (section) => {
    CheckboxPage.expandSection(section);
});

When('I select {string} checkbox', (item) => {
    CheckboxPage.selectCheckbox(item);
});

When('I unselect {string} checkbox', (item) => {
    cy.pause();
    CheckboxPage.unselectCheckbox(item);
});

Then('I should see the following items selected:', (dataTable) => {
    const items = dataTable.hashes().map(row => row.item);
    CheckboxPage.verifySelectedItems(items);
});

Then('I should not see {string} in selected items', (item) => {
    CheckboxPage.verifyItemNotSelected(item);
});

Then('I should see only the following items selected:', (dataTable) => {
    const items = dataTable.hashes().map(row => row.item);
    CheckboxPage.verifyOnlyItemsSelected(items);
}); 
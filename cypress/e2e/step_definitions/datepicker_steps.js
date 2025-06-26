const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
import DatePickerPage from '../../pages/DatePickerPage';

Given('I am on the date picker page', () => {
    DatePickerPage.visit();
});

When('I click on the date picker field', () => {
    DatePickerPage.clickDatePicker();
});

When('I click on the date and time picker field', () => {
    DatePickerPage.clickDateAndTimePicker();
});

When('I select the current date', () => {
    const currentDate = new Date();
    DatePickerPage.selectDate(currentDate);
});

When('I select a date {string} days in the future', (days) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + parseInt(days));
    DatePickerPage.selectDate(futureDate);
});

When('I select a date {string} days in the past', (days) => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - parseInt(days));
    DatePickerPage.selectDate(pastDate);
});

When('I select current date with time {string}', (time) => {
    const currentDate = new Date();
    DatePickerPage.selectDateAndTime(currentDate, time);
});

Then('the selected date should match the current date', () => {
    const currentDate = new Date();
    const formattedDate = DatePickerPage.formatDate(currentDate);
    DatePickerPage.getSelectedDate().should('eq', formattedDate);
});

Then('the selected date should be {string} days ahead of current date', (days) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + parseInt(days));
    const formattedDate = DatePickerPage.formatDate(futureDate);
    DatePickerPage.getSelectedDate().should('eq', formattedDate);
});

Then('the selected date should be {string} days before current date', (days) => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - parseInt(days));
    const formattedDate = DatePickerPage.formatDate(pastDate);
    DatePickerPage.getSelectedDate().should('eq', formattedDate);
});

Then('the selected date and time should match current date with {string}', (time) => {
    const currentDate = new Date();
    const formattedDateTime = DatePickerPage.formatDateAndTime(currentDate, time);
    DatePickerPage.getSelectedDateAndTime().should('eq', formattedDateTime);
}); 
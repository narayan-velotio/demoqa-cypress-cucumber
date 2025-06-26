const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
import SliderPage from '../../pages/SliderPage';

Given('I am on the slider page', () => {
    SliderPage.visit();
});

When('I move the slider to value {string}', (value) => {
    SliderPage.moveSlider(value);
});

Then('the slider value should be {string}', (expectedValue) => {
    SliderPage.verifySliderValue(expectedValue);
});

Then('the slider value text should display {string}', (expectedValue) => {
    SliderPage.verifySliderValueText(expectedValue);
}); 
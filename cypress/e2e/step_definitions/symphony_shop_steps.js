import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../pages/SymphonyHomepage';

Given('the user is on the Symphony homepage', () => {
    HomePage.visit();
    HomePage.waitForPageLoad();
});

When('the user searches for {string}', (productName) => {
    HomePage.searchProduct(productName);
});

When('selects the first product from the results', () => {
    HomePage.selectFirstProduct();
    HomePage.verifyProductDetails();
});

When('the user adds the product to the cart', () => {
    HomePage.addToCart();
});

Then('the product details should be visible', () => {
    HomePage.verifyProductDetails();
});

Then('the cart should reflect the selected product', () => {
    HomePage.verifyProductInCart();
});
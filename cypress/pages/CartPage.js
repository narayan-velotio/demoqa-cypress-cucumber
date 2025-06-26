class CartPage {
    verifyProductInCart() {
      const expectedTitle = Cypress.env('productTitle');
      cy.get('.cart__items .cart__product-name').should('contain.text', expectedTitle);
    }
  }
  
  export default new CartPage();
  
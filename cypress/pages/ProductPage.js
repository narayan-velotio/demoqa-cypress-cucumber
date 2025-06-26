class ProductPage {
    captureProductTitle() {
      cy.get('h1.product__title').invoke('text').then(title => {
        Cypress.env('productTitle', title.trim());
      });
    }
  
    addToCart() {
      cy.get('form[action*="/cart/add"] [type="submit"]').click();
    }
  }
  
  export default new ProductPage();
  
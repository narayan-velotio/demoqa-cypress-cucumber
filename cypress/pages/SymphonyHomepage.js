class HomePage {
  // Selectors
  selectors = {
      searchInput: 'input[type="text"]',
      searchButton: 'button[aria-label="Search"]',
      productCard: '.product-card',
      productTitle: '.product-title',
      addToCartButton: 'button.add-to-cart',
      cartIcon: '.cart-icon',
      cartCount: '.cart-count',
      productPrice: '.product-price',
      productImage: '.product-image',
      categoryMenu: '.category-menu',
      loginButton: '.login-button',
      wishlistButton: '.wishlist-button'
  };

  visit() {
      cy.visit('https://shop.symphonylimited.com/', {
          failOnStatusCode: false,
          timeout: 60000
      });
      // Wait for the main content to load
      cy.get('body').should('be.visible');
  }

  searchProduct(productName) {
      // Wait for the search input to be visible and interactable
      cy.get(this.selectors.searchInput, { timeout: 10000 })
          .should('be.visible')
          .should('not.be.disabled')
          .clear()
          .type(productName, { force: true });
      
      // Click the search button
      cy.get(this.selectors.searchButton)
          .should('be.visible')
          .click({ force: true });
          
      // Wait for search results
      cy.get(this.selectors.productCard, { timeout: 10000 })
          .should('be.visible');
  }

  selectFirstProduct() {
      cy.get(this.selectors.productCard)
          .first()
          .click({ force: true });
          
      // Wait for product details to load
      cy.get(this.selectors.productTitle, { timeout: 10000 })
          .should('be.visible');
  }

  addToCart() {
      cy.get(this.selectors.addToCartButton)
          .should('be.visible')
          .click({ force: true });
          
      // Wait for cart update
      cy.get(this.selectors.cartCount)
          .should('be.visible');
  }

  verifyProductInCart() {
      cy.get(this.selectors.cartIcon)
          .click({ force: true });
          
      cy.get(this.selectors.productCard)
          .should('be.visible');
  }

  // Additional helper methods
  waitForPageLoad() {
      cy.get('body').should('be.visible');
      cy.get(this.selectors.categoryMenu).should('be.visible');
  }

  verifyProductDetails() {
      cy.get(this.selectors.productTitle).should('be.visible');
      cy.get(this.selectors.productPrice).should('be.visible');
      cy.get(this.selectors.productImage).should('be.visible');
  }
}

export default new HomePage();
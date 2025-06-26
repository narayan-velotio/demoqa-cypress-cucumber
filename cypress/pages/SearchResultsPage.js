class SearchResultsPage {
    clickFirstProduct() {
      cy.get('.boost-pfs-search-suggestion-item-product a').first().click();
    }
  }
  
  export default new SearchResultsPage();
  
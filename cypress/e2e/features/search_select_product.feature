Feature: Product Search and Selection

  Scenario: User searches and selects a product
    Given the user is on the Symphony homepage
    When the user searches for "Cooler"
    And the user selects the first product from the results
    And the user adds the product to the cart
    Then the cart should reflect the selected product

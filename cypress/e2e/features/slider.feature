Feature: Slider Functionality

  Background: 
    Given I am on the slider page

  Scenario: Move slider to specific value
    When I move the slider to value "50"
    Then the slider value should be "50"
    And the slider value text should display "50"

  Scenario: Move slider to minimum value
    When I move the slider to value "0"
    Then the slider value should be "0"
    And the slider value text should display "0"

  Scenario: Move slider to maximum value
    When I move the slider to value "100"
    Then the slider value should be "100"
    And the slider value text should display "100" 
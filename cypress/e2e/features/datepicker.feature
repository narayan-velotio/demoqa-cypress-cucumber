Feature: Date Picker Functionality

  Background: 
    Given I am on the date picker page

  Scenario: Select current date in date picker
    When I click on the date picker field
    And I select the current date
    Then the selected date should match the current date

  Scenario: Select a future date in date picker
    When I click on the date picker field
    And I select a date "30" days in the future
    Then the selected date should be "30" days ahead of current date

  Scenario: Select a past date in date picker
    When I click on the date picker field
    And I select a date "15" days in the past
    Then the selected date should be "15" days before current date

  Scenario: Select date and time with specific format
    When I click on the date and time picker field
    And I select current date with time "15:30"
    Then the selected date and time should match current date with "15:30" 
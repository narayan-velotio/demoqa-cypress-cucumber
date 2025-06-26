Feature: TextBox Form Functionality

  Scenario Outline: Fill and submit textbox form with different data
    Given I navigate to the TextBox page
    When I enter fullname "<fullName>"
    And I enter email "<email>"
    And I enter current address "<currentAddress>"
    And I enter permanent address "<permanentAddress>"
    And I click the submit button
    Then I should see the submitted data
      | field             | value             |
      | Name             | <fullName>         |
      | Email            | <email>            |
      | Current Address  | <currentAddress>   |
      | Permanent Address| <permanentAddress> |

    Examples:
      | fullName      | email                | currentAddress     | permanentAddress    |
      | John Doe      | john.doe@email.com   | 123 Main St       | 456 Oak Avenue      |
      | Jane Smith    | jane.smith@email.com | 789 Pine Road     | 321 Maple Lane      |

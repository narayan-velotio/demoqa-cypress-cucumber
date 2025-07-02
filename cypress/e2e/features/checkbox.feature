Feature: Checkbox Functionality

  Scenario: Verify checkbox selections and messages
    Given I navigate to the Checkbox page
    When I expand all checkboxes
    And I select all checkboxes
    Then I should see the following items selected:
      | item         |
      | home         |
      | desktop      |
      | notes        |
      | commands     |
      | documents    |
      | workspace    |
      | react        |
      | angular      |
      | veu          |
      | office       |
      | public       |
      | private      |
      | classified   |
      | general      |
      | downloads    |
      | wordFile     |
      | excelFile    |

  Scenario: Unselect downloads and verify message
    Given I navigate to the Checkbox page
    When I expand all checkboxes
    And I select all checkboxes
    And I unselect "Downloads" checkbox
    Then I should not see "downloads" in selected items
    And I should not see "Word File" in selected items
    And I should not see "Excel File" in selected items 
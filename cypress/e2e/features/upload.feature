Feature: Upload Functionality

  Background:
    Given the user navigates to the DemoQA upload page

  Scenario: Upload the file and verify
    When the user uploads a valid file
    Then the file should be successfully selected

  Scenario: Download the file and verify
    When the user downloads the file
    Then the file should be successfully downloaded

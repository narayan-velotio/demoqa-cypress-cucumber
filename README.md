# DemoQA Cypress Cucumber Tests

This project contains automated tests for the DemoQA website using Cypress and Cucumber.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

```bash
make install
```

This will install all required dependencies including:
- Cypress
- Cucumber preprocessor
- Mochawesome reporter

## Project Structure

```
├── cypress/
│   ├── e2e/
│   │   ├── features/        # Cucumber feature files
│   │   └── step_definitions/# Step definitions
│   ├── pages/              # Page Object Models
│   ├── support/            # Support files and commands
│   └── reports/           # Test reports (generated after test run)
├── cypress.config.js      # Cypress configuration
└── Makefile              # Make commands for common operations
```

## Running Tests

### Run all tests
```bash
make test
```

### Run tests in specific browser
```bash
make test-chrome
make test-firefox
```

### Generate HTML report
```bash
make report
```

### Clean up generated files
```bash
make clean
```

### Run complete test cycle (clean, install, test, report)
```bash
make all
```

## Test Reports

After running tests with `make report`, HTML reports will be generated in the `cypress/reports` directory. These reports include:
- Test results with pass/fail status
- Test duration
- Screenshots of failures
- Test steps and their status

## Features Tested

1. TextBox functionality
   - Input validation
   - Form submission
   - Output verification

2. Checkbox functionality
   - Select all checkboxes
   - Unselect specific checkboxes
   - Verify selected items
   - Handle nested checkboxes

## Contributing

1. Create a feature branch
2. Write tests in `.feature` files
3. Implement step definitions
4. Create or update page objects as needed
5. Submit a pull request 
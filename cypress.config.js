const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  projectId: '4d6p64',
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // Screenshot on failure as Cypress only takes the screenshot on failure no additional condition required, this will only record path
      // Additionally we can disable it using screenshotOnRunFailure: false
      on('after:screenshot', (details) => {
        console.log('Screenshot captured:', details.path);
      });
      
      // Custom task for file deletion
      on('task', {
        downloadFile,
        clearDownloadsFolder(folderPath) {
            const fs = require('fs');
            if (fs.existsSync(folderPath)) {
              fs.rmSync(folderPath, { recursive: true, force: true });
            }
            fs.mkdirSync(folderPath);
            return null;
          },
        });

      return config;
    },

    specPattern: "cypress/e2e/features/*.feature",
    supportFile: "cypress/support/e2e.js",
    downloadsFolder: 'cypress/downloads',
    baseUrl: 'https://demoqa.com',
    env: {
      textBoxUrl: '/text-box',
      checkboxBoxUrl: '/checkbox',
      datePickerUrl: '/date-picker'
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    experimentalOriginDependencies: true,
    retries: {
      runMode: 2,
      openMode: 1
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: true,
      charts: true
    },
    screenshotsFolder: 'cypress/reports/screenshots',
    videosFolder: 'cypress/reports/videos'
  },
});

const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
import UploadPage from '../../pages/UploadPage';

const fileName = 'Narayan_Bhatkande.pdf';
const downloadFolder = 'cypress/downloads';
const downloadFileName = 'sampleFile.jpeg'; 

Given('the user navigates to the DemoQA upload page', () => {
  cy.clearDownloads(downloadFolder);
  cy.visit('/upload-download');
});

When('the user uploads a valid file', () => {
  cy.uploadFile('#uploadFile', fileName);
});

Then('the file should be successfully selected', () => {
  UploadPage.verifyFileUploaded(fileName);
});

When('the user downloads the file', () => {
    cy.pause();
    cy.get('#downloadButton').should('have.attr', 'href').and('include', 'sampleFile.jpeg');

    // cy.intercept('GET', '**/download/sampleFile.jpeg').as('fileRequest');
    // cy.get('#downloadButton').click();

    // cy.wait('@fileRequest').then((interception) => {
    //     const base64Data = interception.response.body;

    //     cy.task('saveBase64File', {
    //         base64String: base64Data,
    //         downloadFileName,
    //         downloadFolder
    //     });
    // });
});

    // cy.get('#downloadButton').invoke('attr', 'href').then((href) => {
    //     cy.downloadFile(href, downloadFolder, downloadFileName)
    // });

Then('the file should be successfully downloaded', () => {
  cy.readFile(`${downloadFolder}/${downloadFileName}`).should('exist');
});


// check any alternative way for download read file

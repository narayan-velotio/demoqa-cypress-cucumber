import 'cypress-file-upload';

class UploadPage {
    elements = {
        uploadFile: () => cy.get('#uploadFile'),
        uploadedFilePath: () => cy.get('#uploadedFilePath'),
    }

    visit() {
        cy.visit('/upload-download');
    }

    verifyFileUploaded (fileName){
        this.elements.uploadedFilePath().should('contain', fileName);
    }

    // verifyDownloadedFile (fileName){
    //     this.elements.downloadFile().should('contain', fileName);
    // }
}

export default new UploadPage();
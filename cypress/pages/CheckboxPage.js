class CheckboxPage {
    // Selectors
    elements = {
        expandAll: () => cy.get('button[title="Expand all"]'),
        collapseAll: () => cy.get('button[title="Collapse all"]'),
        checkboxTree: () => cy.get('.check-box-tree-wrapper'),
        resultText: () => cy.get('#result'),
        toggles: () => cy.get('.rct-node button[title="Toggle"]'),
        checkboxes: () => cy.get('.rct-checkbox'),
        selectedText: () => cy.get('.text-success')
    }

    // Text mappings for items
    textMappings = {
        'downloads': 'downloads',
        'Downloads': 'Downloads',
        'Excel File': 'Excel File',
        'Word File': 'Word File',
        'home': 'home'
    }

    // Parent-child relationships
    itemHierarchy = {
        'Excel File': ['home', 'downloads']
    }

    // Actions
    visit() {
        const checkboxBoxUrl = Cypress.env('checkboxBoxUrl');
        cy.visit(checkboxBoxUrl, {
            onBeforeLoad: (win) => {
                win.sessionStorage.clear();
                win.localStorage.clear();
            },
            failOnStatusCode: false
        });
        // Wait for the checkbox tree to be visible
        this.elements.checkboxTree().should('be.visible');
    }

    expandAll() {
        this.elements.expandAll().click();
        cy.get('.rct-node-expanded').should('exist');
    }

    selectAll() {
        cy.get('.rct-node').first().find('.rct-checkbox').first().click();
    }

    getDisplayText(item) {
        return this.textMappings[item] || item;
    }

    expandSection(section) {
        const displayText = this.getDisplayText(section);
        cy.get('.rct-node')
            .contains('span.rct-title', displayText)
            .parents('.rct-node')
            .first()  // Take only the first matching node
            .then($node => {
                // Check if the node is already expanded
                if (!$node.hasClass('rct-node-expanded')) {
                    cy.wrap($node)
                        .find('button[title="Toggle"]')
                        .first()
                        .click();
                }
            });
        // Wait for expansion animation
        cy.wait(500);
    }

    selectCheckbox(item) {
        const displayText = this.getDisplayText(item);
        
        // If it's Excel File, first expand Downloads
        if (item === 'Excel File') {
            this.expandSection('Downloads');
            
            // Select parent items if needed
            const parents = this.itemHierarchy[displayText] || [];
            parents.forEach(parent => {
                cy.get('.rct-node')
                    .contains('span.rct-title', parent)
                    .parents('.rct-node')
                    .first()
                    .find('.rct-checkbox')
                    .first()
                    .then($checkbox => {
                        // Check if the checkbox is not already selected
                        if (!$checkbox.hasClass('rct-icon-check')) {
                            cy.wrap($checkbox).click();
                        }
                    });
            });
        }

        // Wait for expansion animation
        cy.wait(500);

        // Now select the checkbox
        cy.get('.rct-node')
            .contains('span.rct-title', displayText)
            .parents('.rct-node')
            .first()  // Take only the first matching node
            .find('.rct-checkbox')
            .first()  // Take only the first checkbox
            .click();
    }

    unselectCheckbox(item) {
        const displayText = this.getDisplayText(item);
        cy.get('.rct-node')
            .contains('span.rct-title', displayText)
            .parents('.rct-node')
            .first()  // Take only the first matching node
            .find('.rct-checkbox')
            .first()  // Take only the first checkbox
            .click();
    }

    // Verifications
    verifySelectedItems(items) {
        this.elements.selectedText().then($elements => {
            const selectedText = $elements
                .map((_, el) => el.textContent)
                .get()
                .join(' ');
            
            items.forEach(item => {
                const displayText = this.getDisplayText(item);
                expect(selectedText).to.include(displayText);
            });
        });
    }

    verifyItemNotSelected(item) {
        this.elements.selectedText().then($elements => {
            const selectedText = $elements
                .map((_, el) => el.textContent)
                .get()
                .join(' ');
            
            const displayText = this.getDisplayText(item);
            expect(selectedText).not.to.include(displayText);
        });
    }

    verifyOnlyItemsSelected(items) {
        this.elements.selectedText().then($elements => {
            const selectedText = $elements
                .map((_, el) => el.textContent)
                .get()
                .join(' ');
            
            // Verify all expected items are present
            items.forEach(item => {
                const displayText = this.getDisplayText(item);
                expect(selectedText).to.include(displayText);
            });

            // Get all possible items that should be selected (including parents)
            const expectedItems = new Set();
            items.forEach(item => {
                const displayText = this.getDisplayText(item);
                expectedItems.add(displayText.toLowerCase());
                
                // Add parent items if they exist
                if (this.itemHierarchy[displayText]) {
                    this.itemHierarchy[displayText].forEach(parent => {
                        expectedItems.add(parent.toLowerCase());
                    });
                }
            });

            // Verify no unexpected items are present
            const selectedWords = selectedText.toLowerCase().split(' ').filter(word => word.length > 0);
            selectedWords.forEach(word => {
                expect(expectedItems).to.include(word);
            });
        });
    }
}

export default new CheckboxPage(); 
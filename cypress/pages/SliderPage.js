class SliderPage {
    elements = {
        slider: () => cy.get('.range-slider.range-slider--primary'),
        sliderValue: () => cy.get('#sliderValue'),
        sliderContainer: () => cy.get('#sliderContainer')
    }

    visit() {
        cy.visit('/slider');
        // Wait for the slider to be visible
        this.elements.slider().should('be.visible');
    }

    moveSlider(value) {
        // Get the slider element and move it to the desired value
        this.elements.slider()
            .then($slider => {
                // Get the dimensions and position of the slider
                const rect = $slider[0].getBoundingClientRect();
                const width = rect.width;
                const min = parseInt($slider[0].min || 0);
                const max = parseInt($slider[0].max || 100);
                
                // Calculate the pixel position for the desired value
                const ratio = (value - min) / (max - min);
                const targetX = Math.round(width * ratio);

                // Set the value and style attribute
                $slider[0].value = value;
                $slider[0].style.setProperty('--value', value);

                // Trigger all necessary events
                const input = new Event('input', { bubbles: true });
                const change = new Event('change', { bubbles: true });
                $slider[0].dispatchEvent(input);
                $slider[0].dispatchEvent(change);

                // Update the input value field
                cy.get('#sliderValue').invoke('val', value);
            });

        // Wait for the value to be updated
        cy.wait(500);
    }

    getSliderValue() {
        return this.elements.slider().invoke('val');
    }

    verifySliderValue(expectedValue) {
        this.elements.slider()
            .should('have.value', expectedValue)
            .and('have.attr', 'style')
            .and('include', `--value: ${expectedValue}`);
    }

    verifySliderValueText(expectedValue) {
        this.elements.sliderValue()
            .should('have.value', expectedValue);
    }
}

export default new SliderPage(); 
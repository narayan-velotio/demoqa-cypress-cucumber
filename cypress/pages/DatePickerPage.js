class DatePickerPage {
    elements = {
        datePickerField: () => cy.get('#datePickerMonthYearInput'),
        dateAndTimeField: () => cy.get('#dateAndTimePickerInput'),
        calendar: () => cy.get('.react-datepicker'),
        monthSelect: () => cy.get('.react-datepicker__month-select'),
        yearSelect: () => cy.get('.react-datepicker__year-select'),
        timeList: () => cy.get('.react-datepicker__time-list'),
        selectedDate: () => cy.get('.react-datepicker__day--selected')
    }

    visit() {
        cy.visit('/date-picker');
        // Wait for the date picker field to be visible
        this.elements.datePickerField().should('be.visible');
    }

    clickDatePicker() {
        this.elements.datePickerField().click();
        this.elements.calendar().should('be.visible');
    }

    clickDateAndTimePicker() {
        this.elements.dateAndTimeField().click();
        this.elements.calendar().should('be.visible');
    }

    selectDate(date) {
        const month = date.getMonth();
        const year = date.getFullYear();
        const day = date.getDate();

        // Select month and year
        this.elements.monthSelect().select(month.toString());
        this.elements.yearSelect().select(year.toString());

        // Select day
        cy.get(`.react-datepicker__day--0${day.toString().padStart(2, '0')}`)
            .not('.react-datepicker__day--outside-month')
            .click();
    }

    selectDateAndTime(date, time) {
        // For date and time picker, we need to handle it differently
        this.elements.dateAndTimeField().click();
        
        // Wait for the calendar to be visible
        this.elements.calendar().should('be.visible');
        
        // Select the date first
        const day = date.getDate();
        cy.get(`.react-datepicker__day--0${day.toString().padStart(2, '0')}`)
            .not('.react-datepicker__day--outside-month')
            .click();
        
        // Then select the time
        cy.get('.react-datepicker__time-list-item')
            .contains(time)
            .click();
    }

    getSelectedDate() {
        return this.elements.datePickerField().invoke('val');
    }

    getSelectedDateAndTime() {
        return this.elements.dateAndTimeField().invoke('val');
    }

    // Helper method to format date for comparison
    formatDate(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    // Helper method to format date and time for the date-time picker
    formatDateAndTime(date, time) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        
        // Convert 24-hour time format to 12-hour format with AM/PM
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        
        return `${month} ${day}, ${year} ${hour12}:${minutes} ${ampm}`;
    }
}

export default new DatePickerPage(); 
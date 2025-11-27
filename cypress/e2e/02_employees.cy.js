import { newEmployee } from '../support/utils.js';

describe('Employees', () => {
  beforeEach(() => {
    cy.loginAndMockWithEmployees();
  });

    // Filtering employees
    it('1. Admin should authenticate and search employee by full name - only one match expected', () => {
        // Verify redirection to the correct route
        cy.url().should('include', '/app/funcionarios');
        cy.verifyEmployListNotEmpty();

        cy.searchEmployeeByName('Pedro Henrique Ferreira Silva');
        cy.verifyTotalFilteredItemsAppearAsExpected(1);
    });

    it('2. Should return all employees with matching name - multiple matches expected', () => {
        cy.searchEmployeeByName('Souza');
        cy.verifyTotalFilteredItemsAppearAsExpected(2);
    });

    it('3. Should return results regardless of case sensitivity', () => {
        cy.searchEmployeeByName('maria clara souza oliveira'); // lowercase
        cy.verifyTotalFilteredItemsAppearAsExpected(1);
        cy.wait(2000);
        cy.searchEmployeeByName('MARIA CLARA SOUZA OLIVEIRA'); // uppercase
        cy.verifyTotalFilteredItemsAppearAsExpected(1);
    });

    it('4. Should return all employees when search input is just a space', () => {
        cy.searchEmployeeByName(' ');
        cy.verifyTotalFilteredItemsAppearAsExpected(3); // total of the fixture
    });

    // Registering Employee
    it('5. Should verify that employee registration elements are visible', () => {
        cy.verifyHeaderAndMenuOpenedAdmin();
        cy.accessMenu('Cadastrar funcionário');
        cy.verifyElementsFromRegisterEmployee();
    });

    it('6. Should check if it is possible to register an employee without filling fields - should display error message', () => {
        cy.accessMenu('Cadastrar funcionário');
        cy.submitForm();
        cy.verifyErrorToast('Todos os campos são de preenchimento obrigatório!');
    });

    it('7. Should check if it is possible to register an employee with only ONE name', () => {
        cy.accessMenu('Cadastrar funcionário');
        cy.fillInput('input#employeeName', 'Cicrano');
        cy.submitForm();
        cy.verifyErrorToast('Nome inválido!');
    });

    it('8. Should check if it is possible to register an employee with full name and invalid CPF', () => {
        cy.accessMenu('Cadastrar funcionário');
        cy.fillInput('input#employeeName', newEmployee.name);
        cy.fillInput('input#cpf', '11111111111');
        cy.submitForm();
        cy.verifyErrorToast('CPF inválido!');
    });

    it.skip('9. Should check if it is possible to register an employee with valid name and CPF but without admission date', () => {
        cy.accessMenu('Cadastrar funcionário');
        cy.fillInput('input#employeeName', newEmployee.name);
        cy.fillInput('input#cpf', newEmployee.cpf);
        cy.submitForm();
        cy.verifyErrorToast('O campo data de admissão é obrigatório!');
    });

    it.skip('10. Should successfully register an employee with all required data correctly filled', () => {
        cy.accessMenu('Cadastrar funcionário');
        cy.fillInput('input#employeeName', newEmployee.name);
        cy.fillInput('input#cpf', newEmployee.cpf);
        cy.fillInput('input#admissionDate', newEmployee.admissionDate);
        cy.submitForm();
    });

});
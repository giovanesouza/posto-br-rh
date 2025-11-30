import { selectors } from '../support/selectors';
import { newEmployee, employeeUser, employeeUserWithVacation } from '../support/utils';

describe('Employees', () => {

    // Filtering employees
    it('1. Admin should authenticate and search employee by full name - only one match expected', () => {
        cy.loginAndMockWithEmployees();
        // Verify redirection to the correct route
        cy.url().should('include', '/app/funcionarios');
        cy.verifyEmployListNotEmpty();

        cy.searchEmployeeByName('Pedro Henrique Ferreira Silva');
        cy.verifyTotalFilteredItemsAppearAsExpected(1);
    });

    it('2. Should return all employees with matching name - multiple matches expected', () => {
        cy.loginAndMockWithEmployees();
        cy.searchEmployeeByName('Souza');
        cy.verifyTotalFilteredItemsAppearAsExpected(2);
    });

    it('3. Should return results regardless of case sensitivity', () => {
        cy.loginAndMockWithEmployees();
        cy.searchEmployeeByName('maria clara souza oliveira'); // lowercase
        cy.verifyTotalFilteredItemsAppearAsExpected(1);
        cy.searchEmployeeByName('MARIA CLARA SOUZA OLIVEIRA'); // uppercase
        cy.verifyTotalFilteredItemsAppearAsExpected(1);
    });

    it('4. Should return all employees when search input is just a space', () => {
        cy.loginAndMockWithEmployees();
        cy.searchEmployeeByName(' ');
        cy.verifyTotalFilteredItemsAppearAsExpected(3); // total of the fixture
    });

    // Registering Employee
    it('5. Should verify that employee registration elements are visible', () => {
        cy.loginAndMockWithEmployees();
        cy.verifyHeaderAndMenuOpenedAdmin();
        cy.accessMenu('Cadastrar funcionário');
        cy.verifyElementsFromRegisterAndEditEmployee();
    });

    it('6. Should check if it is possible to register an employee without filling fields - should display error message', () => {
        cy.loginAndMockWithEmployees();
        cy.accessMenu('Cadastrar funcionário');
        cy.submitForm();
        cy.verifyErrorToast('Todos os campos são de preenchimento obrigatório!');
    });

    it('7. Should check if it is possible to register an employee with only ONE name', () => {
        cy.loginAndMockWithEmployees();
        cy.accessMenu('Cadastrar funcionário');
        cy.fillInput(selectors.inputs.employeeName, newEmployee.split(' ')[0]);
        cy.submitForm();
        cy.verifyErrorToast('Nome inválido!');
    });

    it('8. Should check if it is possible to register an employee with full name and invalid CPF', () => {
        cy.loginAndMockWithEmployees();
        cy.accessMenu('Cadastrar funcionário');
        cy.fillInput(selectors.inputs.employeeName, newEmployee.name);
        cy.fillInput(selectors.inputs.cpf, '11111111111');
        cy.submitForm();
        cy.verifyErrorToast('CPF inválido!');
    });

    it('9. Should check if it is possible to register an employee with valid name and CPF but without admission date', () => {
        cy.loginAndMockWithEmployees();
        cy.accessMenu('Cadastrar funcionário');
        cy.fillInput(selectors.inputs.employeeName, newEmployee.name);
        cy.fillInput(selectors.inputs.cpf, newEmployee.cpf);
        cy.submitForm();
        cy.verifyErrorToast('O campo data de admissão é obrigatório!');
    });

    it('10. Should successfully register an employee with all required data correctly filled', () => {
        cy.loginAndMockWithEmployees();
        cy.createEmployeeMock(newEmployee);
        cy.accessMenu('Cadastrar funcionário');
        cy.fillInput(selectors.inputs.employeeName, newEmployee.name);
        cy.fillInput(selectors.inputs.cpf, newEmployee.cpf);
        cy.fillInput(selectors.inputs.admissionDate, newEmployee.admissionDate);
        cy.submitForm();
        cy.wait('@mockCreateEmployee');

        cy.getEmployees('employees2'); // update list with new employee
        cy.verifySuccessToast(`Funcionário "${newEmployee.name}" cadastrado com sucesso!`);
    });

    // Edit Employee
    it('11. Should verify that employee edit elements are visible and match with selected employee', () => {
        cy.loginAndMockWithEmployees('employees2');
        // define the user data
        const employeeId = "897c63ed-680a-44b5-bcd2-7b442afc149b";
        cy.getEmployeeById(employeeId);

        cy.get(selectors.buttons.editBtn).first().click()
        cy.verifyElementsFromRegisterAndEditEmployee();

        cy.wait('@mockEmployeeById').then(({ response }) => {
            const employee = response.body;
            cy.get(selectors.inputs.employeeName).should('have.value', employee.name);
            cy.get(selectors.inputs.cpf).should('have.value', employee.cpf);
            cy.get(selectors.inputs.admissionDate).should('have.value', "2024-05-06");
        });
    });

    // Delete employee
    it('12 Should simulate employee deletion and cancel procedure when popup opens', () => {
        cy.loginAndMockWithEmployees('employees2');

        // intercepts the confirmation popup
        cy.on('window:confirm', (msg) => {
            expect(msg).to.contain(`Tem certeza que deseja excluir o funcionário: ${employeeUser.name}?`);
            return false; // click "Cancel"
        });

        cy.get(selectors.buttons.deleteBtn).first().click();
        cy.get(selectors.employeeList.emptyMessage).contains(`${employeeUser.name}`).should('exist');
    });

    it('13 Should simulate employee deletion and confirm procedure when popup opens to delete employee permanently', () => {
        cy.loginAndMockWithEmployees('employees2'); // Logs in and loads the initial employees list (employees2)
        cy.getEmployees('employees3'); // simulate updated list after removal
        cy.deleteEmployeeById("897c63ed-680a-44b5-bcd2-7b442afc149b"); // Prepares the DELETE mock before the action

        // Intercepts the browser confirmation dialog
        cy.on('window:confirm', (msg) => {
            expect(msg).to.contain(`Tem certeza que deseja excluir o funcionário: ${employeeUser.name}?`);
            return true; // click "Ok"
        });

        cy.get(selectors.buttons.deleteBtn).first().click(); // Clicks the delete button on the first employee in the list

        //  Waits for the DELETE mock and asserts the server responded with 204 (success)
        cy.wait('@mockDeleteEmployee').then(({ response }) => {
            expect(response.statusCode).to.eq(204);
        });

        cy.wait('@mockEmployees'); // Waits for the GET /employees request to reload the updated mock list
        cy.get(selectors.employeeList.emptyMessage).contains(`${employeeUser.name}`).should('not.exist'); // Ensures the deleted employee no longer appears in the table
    });


    it('14 Tries to delete an employee who has registered vacations — it should not be allowed', () => {
        cy.loginAndMockWithEmployees('employees3');
        cy.deleteEmployeeById("987c63ed-670a-44b5-bcd2-7b452afc148b", true); // Prepares the DELETE mock returning an error (hasVacation = true → backend returns 400)

        cy.on('window:confirm', (msg) => {
            expect(msg).to.contain(`Tem certeza que deseja excluir o funcionário: ${employeeUserWithVacation.name}?`);
            return true; // click "Ok"
        });

        cy.get(selectors.buttons.deleteBtn).first().click();

        //  Waits for the DELETE mock and asserts the server response is 400 (business rule violation)
        cy.wait('@mockDeleteEmployee').then(({ response }) => {
            console.log(response)
            expect(response.statusCode).to.eq(400);
        });

        // Validates that the error toast message is shown in the UI
        cy.verifyErrorToast('Não é possível excluir este funcionário, pois há férias vinculadas à ele.')
    });

});
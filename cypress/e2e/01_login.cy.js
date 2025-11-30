import { selectors } from '../support/selectors';
import { adminUser, employeeUser, employeeUserWithVacation, invalidUser } from '../support/utils';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('1. Should display login fields', () => {
    cy.get(selectors.login.username).should('be.visible');
    cy.get(selectors.login.password).should('be.visible');
    cy.get(selectors.login.submitBtn).should('contain', 'Entrar');
  });

  it('2. Should show error when submitting empty fields', () => {
    cy.get(selectors.login.submitBtn).click();
    cy.wait(2000); // wait to visually confirm the error message
    cy.verifyErrorToast('Verifique se os campos foram preenchidos corretamente');
  });

  it('3. Invalid data: Should display error message', () => {
    cy.login(invalidUser.username, invalidUser.password);
    cy.wait(2000); // wait to visually confirm the error message
    cy.verifyErrorToast('Verifique se os campos foram preenchidos corretamente');
  });

  it('4. Admin should authenticate and view an empty employees list', () => {
    // Intercept login as admin user
    cy.mockAthenticateAs('adminUserLocalStorage'); // uses the custom command to mock login as admin
    cy.getEmployees(); // when without parameter, return an empty employees list

    // Perform login
    cy.login(adminUser.username, adminUser.password);
    cy.wait('@mockSignInRequest'); // wait for the mocked sign-in request
    cy.wait('@mockEmployees'); // wait for the mocked employees request

    // Verify redirection to the correct route
    cy.url().should('include', '/app/funcionarios');
    cy.wait(2000); // wait to visually success message
    cy.verifySuccessToast('Olá, Admin. Seja bem vindo(a)!');
    cy.get(selectors.toasts.closeBtn).click();
    cy.wait(2000);

    cy.verifyEmployEmptyList();
    cy.verifyFooter();
  });

    it('5. Admin should authenticate and view the employees list upon login', () => {
    cy.loginAndMockWithEmployees();

    // Verify redirection to the correct route
    cy.url().should('include', '/app/funcionarios');
    cy.wait(2000); // wait to visually success message
    cy.verifySuccessToast('Olá, Admin. Seja bem vindo(a)!');
    cy.get(selectors.toasts.closeBtn).click();
    cy.wait(2000);
    
    cy.verifyHeaderAndMenuOpenedAdmin();
    cy.verifyEmployListNotEmpty();
    cy.verifyFooter();
  });

  it('6. Employee should authenticate and be redirected to an empty vacation history', () => {
    const employeeId = "897c63ed-680a-44b5-bcd2-7b442afc149b"; // ID of the employee in the fixture

    // Intercept login as regular employee
    cy.mockAthenticateAs('employeeUserLocalStorage');
    cy.getEmployeeById(employeeId); // uses the custom command to mock employee by ID data

    // Perform login
    cy.login(employeeUser.username, employeeUser.password);
    cy.wait('@mockSignInRequest'); // wait for the mocked sign-in request
    
    // Verify redirection to the correct route
    cy.url().should('include', `/app/historico-de-ferias/funcionario/${employeeId}`);
    cy.wait('@mockEmployeeById'); // wait for the mocked employee by ID request

    cy.verifyHeaderAndMenuEmployee();
    cy.get(selectors.headers.pageTitle).should('contain', 'Histórico de férias do(a) funcionário(a): ').and('contain', 'Pedro Henrique Ferreira Silva'); // verify partial text
    cy.get(selectors.employeeList.table).should('exist').and('be.visible');
    cy.get(selectors.employeeList.emptyMessage).should('contain', 'Nenhuma férias cadastrada!');
    cy.verifyFooter();
  });


  it('7. Employee should authenticate and view vacation history', () => {
    const employeeId = "987c63ed-670a-44b5-bcd2-7b452afc148b"; 

    // Intercept login as regular employee
    cy.mockAthenticateAs('employeeUserWithVacationLocalStorage');
    cy.getEmployeeById(employeeId); // uses the custom command to mock employee by ID data

    // Perform login
    cy.login(employeeUserWithVacation.username, employeeUserWithVacation.password);
    cy.wait('@mockSignInRequest'); // wait for the mocked sign-in request
    
    // Verify redirection to the correct route
    cy.url().should('include', `/app/historico-de-ferias/funcionario/${employeeId}`);
    cy.wait('@mockEmployeeById'); // wait for the mocked employee by ID request

    cy.verifyHeaderAndMenuEmployee();
    cy.get(selectors.headers.pageTitle).should('contain', 'Histórico de férias do(a) funcionário(a): ').and('contain', 'Maria Clara Souza Oliveira'); // verify partial text
    cy.get(selectors.employeeList.table).should('exist').and('be.visible');
    cy.get(selectors.employeeList.emptyMessage).should('not.contain', 'Nenhuma férias cadastrada!');
    cy.verifyFooter();
  });

});
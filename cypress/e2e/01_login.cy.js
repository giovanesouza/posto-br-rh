describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('1. Should display login fields', () => {
    cy.get('input[name=username]').should('be.visible');
    cy.get('input[name=password]').should('be.visible');
    cy.get('button[type=submit]').should('contain', 'Entrar');
  });

  it('2. Should show error when submitting empty fields', () => {
    cy.get('button[type=submit]').click();
    cy.wait(2000); // wait to visually confirm the error message
    cy.get('div').should('contain', 'Verifique se os campos foram preenchidos corretamente');
  });

  it('3. Invalid data: Should display error message', () => {
    cy.login('usuario_teste', '123456');
    cy.wait(2000); // wait to visually confirm the error message
    cy.get('div').should('contain', 'Verifique se os campos foram preenchidos corretamente');
  });

  it('4. Admin should authenticate and view an empty employees list', () => {
    // Intercept login as admin user
    cy.mockAthenticateAs('adminUserLocalStorage'); // uses the custom command to mock login as admin
    cy.getEmployees(); // when without parameter, return an empty employees list

    // Perform login
    cy.login('giovanesouza', '123456');
    cy.wait('@mockSignInRequest'); // wait for the mocked sign-in request
    cy.wait('@mockEmployees'); // wait for the mocked employees request

    // Verify redirection to the correct route
    cy.url().should('include', '/app/funcionarios');
    cy.wait(2000); // wait to visually success message
    cy.get('div').should('contain', 'Olá, Admin. Seja bem vindo(a)!');
    cy.get('button.Toastify__close-button').click();
    cy.wait(2000);

    cy.get('ul.menu-hidden').should('exist').and('be.visible');
    cy.get('button.material-symbols-outlined[title="Configurações do Admin"]').should('exist').and('be.visible');
    cy.get('button.logout').should('exist').and('be.visible');
    cy.get('h1').should('have.text', 'Situação dos funcionários'); // verify exact text
    cy.get('input[name="searchEmployeeName"').should('exist').and('be.visible');
    cy.get('table').should('exist').and('be.visible');
    cy.get('body').should('contain', 'Nenhum funcionário cadastrado!');
    cy.get('footer address').should('exist').and('be.visible');
  });

    it('5. Admin should authenticate and view the employees list upon login', () => {
    // Intercept login as admin user
    cy.mockAthenticateAs('adminUserLocalStorage'); // uses the custom command to mock login as admin
    cy.getEmployees('employees'); // uses the custom command to mock employees data; 

    // Perform login
    cy.login('giovanesouza', '123456');
    cy.wait('@mockSignInRequest'); // wait for the mocked sign-in request
    cy.wait('@mockEmployees'); // wait for the mocked employees request

    // Verify redirection to the correct route
    cy.url().should('include', '/app/funcionarios');
    cy.wait(2000); // wait to visually success message
    cy.get('div').should('contain', 'Olá, Admin. Seja bem vindo(a)!');
    cy.get('button.Toastify__close-button').click();
    cy.wait(2000);
    
    cy.get('ul.menu-hidden').should('exist').and('be.visible');
    cy.get('button.material-symbols-outlined[title="Configurações do Admin"]').should('exist').and('be.visible');
    cy.get('button.logout').should('exist').and('be.visible');
    cy.get('h1').should('have.text', 'Situação dos funcionários'); // verify exact text
    cy.get('input[name="searchEmployeeName"').should('exist').and('be.visible');
    cy.get('table').should('exist').and('be.visible');
    cy.get('table .employee-situation.has-vacation').should('exist').and('be.visible').and('contain', 'Direito a férias');
    cy.get('table .employee-situation.no-vacation').should('exist').and('be.visible').and('contain', 'Sem direito a férias');
    cy.get('button.bg-hover-green.color-green').should('exist').and('be.visible');
    cy.get('button.bg-hover-blue.color-blue').should('exist').and('be.visible');
    cy.get('button.bg-hover-danger.color-danger').should('exist').and('be.visible');
    cy.get('footer address').should('exist').and('be.visible');
  });

  it('6. Employee should authenticate and be redirected to an empty vacation history', () => {
    const employeeId = "897c63ed-680a-44b5-bcd2-7b442afc149b"; // ID of the employee in the fixture

    // Intercept login as regular employee
    cy.mockAthenticateAs('employeeUserLocalStorage');
    cy.getEmployeeById(employeeId); // uses the custom command to mock employee by ID data

    // Perform login
    cy.login('pedrohenrique', '123456');
    cy.wait('@mockSignInRequest'); // wait for the mocked sign-in request
    
    // Verify redirection to the correct route
    cy.url().should('include', `/app/historico-de-ferias/funcionario/${employeeId}`);
    cy.wait('@mockEmployeeById'); // wait for the mocked employee by ID request

    cy.get('ul.menu-hidden').should('not.exist');
    cy.get('div.right-menu').should('exist').and('be.visible');
    cy.get('button.logout').should('exist').and('be.visible');
    cy.get('h1.text-align-center').should('contain', 'Histórico de férias do(a) funcionário(a): ').and('contain', 'Pedro Henrique Ferreira Silva'); // verify partial text
    cy.get('table').should('exist').and('be.visible');
    cy.get('table td').should('contain', 'Nenhuma férias cadastrada!');
    cy.get('footer address').should('exist').and('be.visible');
  });


  it('7. Employee should authenticate and view vacation history', () => {
    const employeeId = "987c63ed-670a-44b5-bcd2-7b452afc148b"; 

    // Intercept login as regular employee
    cy.mockAthenticateAs('employeeUserWithVacationLocalStorage');
    cy.getEmployeeById(employeeId); // uses the custom command to mock employee by ID data

    // Perform login
    cy.login('mariaoliveira', '123456');
    cy.wait('@mockSignInRequest'); // wait for the mocked sign-in request
    
    // Verify redirection to the correct route
    cy.url().should('include', `/app/historico-de-ferias/funcionario/${employeeId}`);
    cy.wait('@mockEmployeeById'); // wait for the mocked employee by ID request

    cy.get('ul.menu-hidden').should('not.exist');
    cy.get('div.right-menu').should('exist').and('be.visible');
    cy.get('button.logout').should('exist').and('be.visible');
    cy.get('h1.text-align-center').should('contain', 'Histórico de férias do(a) funcionário(a): ').and('contain', 'Maria Clara Souza Oliveira'); // verify partial text
    cy.get('table').should('exist').and('be.visible');
    cy.get('table td').should('not.contain', 'Nenhuma férias cadastrada!');
    cy.get('footer address').should('exist').and('be.visible');
  });

});
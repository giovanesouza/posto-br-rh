describe('Login', () => {
  beforeEach(() => {
    // Intercept the POST /sign-in and return expected data for the application
    cy.intercept('POST', '/sign-in', {
      statusCode: 200,
      body: {
        employeeId: "897c63ed-680a-44b5-bcd2-7b442afc149b",
        isAdmin: true,
        profile: null,
        token: "fake-token",
        userId: "f9fce246-a363-4f00-bfd2-9aed6378d771"
      }
    }).as('mockLoginAdmin');

    // Intercept the GET /employees and return a mocked list
    cy.intercept('GET', '/employees', (req) => {
      expect(req.headers.authorization).to.eq('Bearer fake-token');
      req.reply({
        statusCode: 200,
        body: [
          { name: "João Silva", position: "Analista" },
          { name: "Maria Souza", position: "Gerente" }
        ]
      });
    }).as('mockEmployees');

    // Simulate complete UserInfo in localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('userInfo', JSON.stringify({
        employeeId: "897c63ed-680a-44b5-bcd2-7b442afc149b",
        isAdmin: true,
        profile: null,
        token: "fake-token",
        userId: "f9fce246-a363-4f00-bfd2-9aed6378d771"
      }));
    });

    cy.visit('/');
  });

  it('1. Should display login fields', () => {
    cy.get('input[name=username]').should('be.visible');
    cy.get('input[name=password]').should('be.visible');
    cy.get('button[type=submit]').should('contain', 'Entrar');
  });

  it('2. Should show error when submitting empty fields', () => {
    cy.get('button[type=submit]').click();
    cy.get('div').should('contain', 'Verifique se os campos foram preenchidos corretamente');
  });

  it('3. Invalid data: Should display error message', () => {
    cy.login('usuario_teste', '123456');
    cy.get('div').should('contain', 'Verifique se os campos foram preenchidos corretamente');
  });

  it('4. Admin User should authenticate with valid credentials', () => {
    cy.login('giovanesouza', '123456');
    cy.wait('@mockLoginAdmin');
    cy.url().should('include', '/app/funcionarios');
    cy.get('ul.menu-hidden').should('exist').and('be.visible');
    cy.get('button.material-symbols-outlined').should('exist').and('be.visible');
    cy.get('button.logout').should('exist').and('be.visible');
    cy.get('h1').should('have.text', 'Situação dos funcionários');
    cy.get('input[name="searchEmployeeName"').should('exist').and('be.visible');
    cy.get('table').should('exist').and('be.visible');
    cy.get('body').should('contain', 'Nenhum funcionário cadastrado!');
  });

  it('5. Regular employee user should authenticate and be redirected to vacation history', () => {
    // Intercept login as regular employee
    cy.intercept('POST', '/sign-in', {
      statusCode: 200,
      body: {
        employeeId: "897c63ed-680a-44b5-bcd2-7b442afc149b",
        isAdmin: false,
        profile: "employee",
        token: "fake-token",
        userId: "f9fce246-a363-4f00-bfd2-9aed6378d771"
      }
    }).as('mockLoginEmployee');

    // Simulate UserInfo in localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('userInfo', JSON.stringify({
        employeeId: "897c63ed-680a-44b5-bcd2-7b442afc149b",
        isAdmin: false,
        profile: "employee",
        token: "fake-token",
        userId: "f9fce246-a363-4f00-bfd2-9aed6378d771"
      }));
    });

    cy.visit('/');

    // Perform login
    cy.login('giovanesouza', '123456');
    cy.wait('@mockLoginEmployee');

    // Verify redirection to the correct route
    cy.url().should('include', '/app/historico-de-ferias/funcionario/897c63ed-680a-44b5-bcd2-7b442afc149b');

    cy.get('ul.menu-hidden').should('not.exist');
    cy.get('div.right-menu').should('exist').and('be.visible');
    cy.get('button.logout').should('exist').and('be.visible');
    cy.get('h1').should('contain', 'Histórico de férias do(a) funcionário(a):');
    cy.get('table').should('exist').and('be.visible');
    cy.get('body').should('contain', 'Nenhuma férias cadastrada!');
  });
});
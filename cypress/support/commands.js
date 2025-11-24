// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Login: The username must be between 12 to 20 letters and password, 6 to 20.
Cypress.Commands.add('login', (username, password) => {
  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
});

Cypress.Commands.add('clearAllInputs', () => {
  cy.get('input').each(($el) => {
    cy.wrap($el).clear();
  });
});




// ============ Mocks ============ 

// Login for different users

Cypress.Commands.add('mockAthenticateAs', (userFixture) => {
  cy.fixture(userFixture).then((userInfo) => {
    cy.intercept('POST', '/sign-in', {
      statusCode: 200,
      body: userInfo
    }).as('mockSignInRequest');

    cy.window().then((win) => {
      win.localStorage.setItem('userInfo', JSON.stringify(userInfo));
    });
  });
});


// Mock Employees data - Intercept the GET '/employees' and return a mocked list
Cypress.Commands.add('getEmployees', (fixture) => {
  if (!fixture) {
    // Nenhum parâmetro → retorna lista vazia
    cy.intercept('GET', '/employees?*', (req) => {
      expect(req.headers.authorization).to.eq('Bearer fake-token'); // validate auth header is present and correct
      req.reply({
        statusCode: 200,
        body: []
      });
    }).as('mockEmployees');
  } else {
    cy.fixture(fixture).then((employees) => {
      cy.intercept('GET', '/employees?*', (req) => {
        expect(req.headers.authorization).to.eq('Bearer fake-token');
        // Reply with mocked employees data
        req.reply({
          statusCode: 200,
          body: employees
        });
      }).as('mockEmployees');
    });
  }
});


Cypress.Commands.add('getEmployeeById', (id) => {
  cy.intercept('GET', `/employees/${id}`, (req) => {
    expect(req.headers.authorization).to.eq('Bearer fake-token');


    req.reply({
      statusCode: 200,
      body: employeeData
    });
  }).as('mockEmployeeById');
});

Cypress.Commands.add('getEmployeeById', (employeeId, fixture = 'employees') => {
  cy.fixture(fixture).then((employees) => {
    // Find the employee with the matching ID in the fixture data
    const employee = employees.find(e => e.id === employeeId);

    cy.intercept('GET', `/employees/${employeeId}`, (req) => {
      expect(req.headers.authorization).to.eq('Bearer fake-token');

      req.reply({
        statusCode: 200,
        body: employee || {} // return empty object if not found
      });
    }).as('mockEmployeeById');
  });
});
// ====== FUNCTIONS =======

// --- Login ---

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


// --- Navigation between menu items ---

// by text
Cypress.Commands.add('accessMenu', (text) => {
  cy.contains('li', text).click()
})


// by ref. (route)
Cypress.Commands.add('accessHref', (href) => {
  cy.get(`a[href="${href}"]`).click()
})


// --- Employees ---
Cypress.Commands.add('searchEmployeeByName', (name) => {
  cy.get('input[name="searchEmployeeName"').clear().type(name);
  cy.wait(2000);
});

Cypress.Commands.add('verifyTotalFilteredItemsAppearAsExpected', (total) => {
  cy.get('table tbody tr').should('have.length', total);
});

Cypress.Commands.add('submitForm', () => {
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('fillInput', (selector, value) => {
  cy.get(selector).should('exist').and('be.visible').clear().type(value)
});


// ====== UI Verifications =======

// == COMPONENTS ==

// --- Pop up messages ---

Cypress.Commands.add('verifyErrorToast', (text) => {
  cy.get('.Toastify__toast--error[role="alert"]', { timeout: 10000 }).last().should('be.visible').and('contain.text', text)
})

Cypress.Commands.add('verifySuccessToast', (text) => {
  cy.get('.Toastify__toast--success[role="alert"]', { timeout: 10000 }).last().should('be.visible').and('contain.text', text)
})

// --- MENU & HEADER ---

// Admin
Cypress.Commands.add('verifyHeaderAndMenuOpenedAdmin', () => {
  cy.get('ul.menu-hidden').should('exist').and('be.visible');
  cy.get('a[href="/app/funcionarios"] li').should('contain', 'Listar funcionários')
  cy.get('a[href="/app/cadastrar-funcionario"] li').should('contain', 'Cadastrar funcionário')
  cy.get('a[href="/app/cadastrar-usuario"] li').should('contain', 'Criar usuário')
  cy.get('button.material-symbols-outlined[title="Configurações do Admin"]').should('exist').and('be.visible');
  cy.get('button.logout').should('exist').and('be.visible');
});

// Employee
Cypress.Commands.add('verifyHeaderAndMenuEmployee', () => {
  cy.get('ul.menu-hidden').should('not.exist');
  cy.get('div.right-menu').should('exist').and('be.visible');
  cy.get('button.logout').should('exist').and('be.visible');
});

// --- FOOTER ---
Cypress.Commands.add('verifyFooter', () => {
  cy.get('footer address').should('exist').and('be.visible');
});


// == PAGES: main content ==

// --- Listar funcionários: */app/funcionarios ---

// List
Cypress.Commands.add('verifyEmployListNotEmpty', () => {
  cy.get('h1').should('have.text', 'Situação dos funcionários'); // verify exact text
  cy.get('input[name="searchEmployeeName"').should('exist').and('be.visible');
  cy.get('table').should('exist').and('be.visible');
  cy.get('table .employee-situation.has-vacation').should('exist').and('be.visible').and('contain', 'Direito a férias');
  cy.get('table .employee-situation.no-vacation').should('exist').and('be.visible').and('contain', 'Sem direito a férias');
  cy.get('button.bg-hover-green.color-green').should('exist').and('be.visible');
  cy.get('button.bg-hover-blue.color-blue').should('exist').and('be.visible');
  cy.get('button.bg-hover-danger.color-danger').should('exist').and('be.visible');
});

Cypress.Commands.add('verifyEmployEmptyList', () => {
  cy.get('ul.menu-hidden').should('exist').and('be.visible');
  cy.get('button.material-symbols-outlined[title="Configurações do Admin"]').should('exist').and('be.visible');
  cy.get('button.logout').should('exist').and('be.visible');
  cy.get('h1').should('have.text', 'Situação dos funcionários'); // verify exact text
  cy.get('input[name="searchEmployeeName"').should('exist').and('be.visible');
  cy.get('table').should('exist').and('be.visible');
  cy.get('table td').should('contain', 'Nenhum funcionário cadastrado!');
});



// --- Cadastrar funcionário: */app/cadastrar-funcionario ---
Cypress.Commands.add('verifyElementsFromRegisterEmployee', () => {
  cy.get('h1').should('exist').and('be.visible').and('have.text', 'Cadastrar funcionário');
  cy.get('label[for="employeeName"]').should('exist').and('be.visible').and('have.text', 'Nome:');
  cy.get('input#employeeName').should('exist').and('be.visible');
  cy.get('label[for="cpf').should('exist').and('be.visible').and('have.text', 'CPF:');
  cy.get('input#cpf').should('exist').and('be.visible');
  cy.get('label[for="admissionDate"]').should('exist').and('be.visible').and('have.text', 'Data de Admissão:');
  cy.get('input#admissionDate').should('exist').and('be.visible');
  cy.get('button[type="submit"]').should('exist').and('be.visible');
});

// --- Editar Funcionário: */app/editar-funcionario/{id} ---


// --- Cadastrar férias:  */app/cadastrar-ferias/funcionario/{id} ---

// --- Histórico de férias:  */app/historico-de-ferias/funcionario/{id} ---

// --- Criar usuário:  */app/cadastrar-usuario ---

// --- Editar login:  */app/settings/atualizar-login/user/{id} ---


// ============ Mocks ============ 

// Login using different users

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
    cy.intercept('GET', '/employees?*', (req) => {
      req.reply({ statusCode: 200, body: [] });
    }).as('mockEmployees');
  } else {
    cy.fixture(fixture).then((employees) => {
      cy.intercept('GET', '/employees?*', (req) => {
        const searchParam = (req.query.name || '').toLowerCase(); // <-- CORRETO AGORA

        let filtered = employees;
        if (searchParam) {
          filtered = employees.filter(e =>
            (e.name || '').toLowerCase().includes(searchParam)
          );
        }
        req.reply({ statusCode: 200, body: filtered });
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


Cypress.Commands.add('loginAndMockWithEmployees', () => {
  cy.visit('/');
  // Intercept login as admin user
  cy.mockAthenticateAs('adminUserLocalStorage'); // uses the custom command to mock login as admin
  cy.getEmployees('employees'); // uses the custom command to mock employees data; 

  // Perform login
  cy.login('giovanesouza', '123456');
  cy.wait('@mockSignInRequest'); // wait for the mocked sign-in request
  cy.wait('@mockEmployees'); // wait for the mocked employees request
});


Cypress.Commands.add('mockEmployees', (employeeData) => {
  cy.intercept('POST', '/employees', (req) => {
    expect(req.headers.authorization).to.eq('Bearer fake-token') // ou JWT válido

    req.reply({
      statusCode: 200,
      body: { message: 'Usuário criado com sucesso!', data: employeeData }
    })
  }).as('mockEmployees')
})

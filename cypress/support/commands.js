import { selectors } from './selectors';
import { adminUser, token } from '../support/utils'

// =========================
//          LOGIN
// =========================

// Login with username and password
Cypress.Commands.add('login', (username, password) => {
  cy.get(selectors.login.username).type(username)
  cy.get(selectors.login.password).type(password)
  cy.get(selectors.login.submitBtn).click()
});

// Clear all input fields
Cypress.Commands.add('clearAllInputs', () => {
  cy.get(selectors.inputs.allInputs).each(($el) => cy.wrap($el).clear())
});


// =========================
//         NAVIGATION
// =========================

// Navigate using menu text
Cypress.Commands.add('accessMenu', (text) => {
  cy.contains('li', text).click()
});

// Navigate using href
Cypress.Commands.add('accessHref', (href) => {
  cy.get(`a[href="${href}"]`).click()
});


// =========================
//        EMPLOYEES
// =========================

Cypress.Commands.add('searchEmployeeByName', (name) => {
  cy.get(selectors.inputs.searchEmployeeName).clear().type(name)
  cy.wait(2000)
});

Cypress.Commands.add('verifyTotalFilteredItemsAppearAsExpected', (total) => cy.get(selectors.employeeList.tableRows).should('have.length', total));

Cypress.Commands.add('selectVacationHistoryButton', (employeeName) => {
  cy.contains('tbody tr', employeeName).click().parent('tr').within(() => {
    cy.get('button[title="Exibir histórico de férias"]').click({ force: true });
  });
});

Cypress.Commands.add('selectVacationHistoryButton', (employeeName) => {
  cy.contains('tbody tr', employeeName).within(() => {
    cy.get('button[title="Exibir histórico de férias"]').click({ force: true });
  });
});


Cypress.Commands.add('submitForm', () => cy.get(selectors.buttons.submit).click());

// Fill any input by selector
Cypress.Commands.add('fillInput', (selector, value) => cy.get(selector).should('exist').and('be.visible').clear().type(value));


// =========================
//       TOASTS
// =========================

Cypress.Commands.add('verifyErrorToast', (text) => {
  cy.scrollTo('top');
  cy.get(selectors.toasts.error, { timeout: 8000 })
    .should('be.visible')
    .and('contain.text', text)
});

Cypress.Commands.add('verifySuccessToast', (text) => {
  cy.scrollTo('top');
  cy.get(selectors.toasts.success, { timeout: 8000 })
    .should('be.visible')
    .and('contain.text', text)
});


// =========================
//    HEADER & MENU CHECK
// =========================

Cypress.Commands.add('verifyHeaderAndMenuOpenedAdmin', () => {
  cy.get(selectors.menu.sidebar).should('exist').and('be.visible')
  cy.get(selectors.menu.listEmployees).should('contain', 'Listar funcionários')
  cy.get(selectors.menu.createEmployee).should('contain', 'Cadastrar funcionário')
  cy.get(selectors.menu.createUser).should('contain', 'Criar usuário')
  cy.get(selectors.buttons.adminSettings).should('exist').and('be.visible')
  cy.get(selectors.buttons.logout).should('exist').and('be.visible')
});

Cypress.Commands.add('verifyHeaderAndMenuEmployee', () => {
  cy.get(selectors.menu.sidebar).should('not.exist')
  cy.get(selectors.menu.rightMenu).should('exist').and('be.visible')
  cy.get(selectors.buttons.logout).should('exist').and('be.visible')
});


// =========================
//          FOOTER
// =========================

Cypress.Commands.add('verifyFooter', () => {
  cy.get(selectors.footer.address).should('exist').and('be.visible')
});


// =========================
//   LIST EMPLOYEES PAGE
// =========================

Cypress.Commands.add('verifyEmployListNotEmpty', () => {
  cy.get(selectors.headers.pageTitle).should('have.text', 'Situação dos funcionários')
  cy.get(selectors.inputs.searchEmployeeName).should('be.visible')
  cy.get(selectors.employeeList.table).should('be.visible')
  cy.get(selectors.employeeList.situationHasVacation).should('contain', 'Direito a férias')
  cy.get(selectors.employeeList.situationNoVacation).should('contain', 'Sem direito a férias')
  cy.get(selectors.buttons.editBtn).should('be.visible')
  cy.get(selectors.buttons.viewBtn).should('be.visible')
  cy.get(selectors.buttons.deleteBtn).should('be.visible')
});

Cypress.Commands.add('verifyEmployEmptyList', () => {
  cy.get(selectors.menu.sidebar).should('exist')
  cy.get(selectors.buttons.adminSettings).should('exist')
  cy.get(selectors.buttons.logout).should('exist')
  cy.get(selectors.headers.pageTitle).should('have.text', 'Situação dos funcionários')
  cy.get(selectors.inputs.searchEmployeeName).should('exist')
  cy.get(selectors.employeeList.table).should('be.visible')
  cy.get(selectors.employeeList.emptyMessage).should('contain', 'Nenhum funcionário cadastrado!')
});


// =========================
//   REGISTER / EDIT EMPLOYEE
// =========================

Cypress.Commands.add('verifyElementsFromRegisterAndEditEmployee', () => {
  cy.get(selectors.headers.pageTitle)
    .invoke('text')
    .should((text) => {
      expect(['Cadastrar funcionário', 'Editar funcionário']).to.include(text.trim())
    })

  cy.get('label[for="employeeName"]').should('have.text', 'Nome:')
  cy.get(selectors.inputs.employeeName).should('be.visible')

  cy.get('label[for="cpf"]').should('have.text', 'CPF:')
  cy.get(selectors.inputs.cpf).should('be.visible')

  cy.get('label[for="admissionDate"]').should('have.text', 'Data de Admissão:')
  cy.get(selectors.inputs.admissionDate).should('be.visible')

  cy.get(selectors.buttons.submit).should('be.visible')
});

// =========================
//   VACATION REGISTRATION PAGE
// =========================

// Verify all required elements on Vacation Registration Page
Cypress.Commands.add('verifyVacationRegistrationPage', () => {
  cy.get(selectors.headers.pageTitle).should('be.visible').and('contain.text', 'Cadastrar férias');
  cy.get(selectors.vacationHistory.isVacationSold).should('exist').and('be.visible');
  cy.get(selectors.vacationHistory.soldDays).should('exist').and('be.visible').and('have.attr', 'disabled');
  cy.get(selectors.vacationHistory.startDate).should('exist').and('be.visible');
  cy.get(selectors.vacationHistory.endDate).should('exist').and('be.visible').and('have.attr', 'readonly');
  cy.get(selectors.vacationHistory.submitBtn).should('exist').and('be.visible');
});


// =========================
//      CREATE USER PAGE
// =========================

// Verify all required elements on Create User Page
Cypress.Commands.add('verifyCreateUserPage', () => {
  cy.get(selectors.headers.pageTitle).should('be.visible').and('contain.text', 'Cadastrar Login Para Funcionário');
  cy.get(selectors.createUser.containerMessage).should('exist').and('be.visible');
  cy.get(selectors.createUser.employeeSelect).should('exist').and('be.visible');
  cy.get(selectors.createUser.usernameInput).should('exist').and('be.visible').and('have.attr', 'minlength', '12').and('have.attr', 'maxlength', '20');
  cy.get(selectors.createUser.passwordInput).should('exist').and('be.visible').and('have.attr', 'disabled');
  cy.get(selectors.createUser.submitBtn).should('exist').and('be.visible');
});

Cypress.Commands.add('selectOption', (selectSelector, optionValueOrText) => {
  cy.get(selectSelector).select(optionValueOrText);
});



// =========================
//        EDIT USER PAGE
// =========================

// Verify all required elements on Edit User Page
Cypress.Commands.add('verifyEditUserPage', () => {
  cy.get(selectors.headers.pageTitle).should('exist').and('be.visible').and('contain.text', 'Editar login');
  cy.get(selectors.editUser.usernameInput).should('exist').and('be.visible').and('have.attr', 'minlength', '12').and('have.attr', 'maxlength', '20');
  cy.get(selectors.editUser.passwordInput).should('exist').and('be.visible').and('have.attr', 'maxlength', '20');
  cy.get(selectors.editUser.infoAlert).should('exist').and('be.visible').and('contain.text', 'Caso não queira mudar a senha');
  cy.get(selectors.editUser.submitBtn).should('exist').and('be.visible');
});

Cypress.Commands.add('verifyInputValue', (selector, expectedValue) => {
  cy.get(selector).should('have.value', expectedValue);
});


// =================================================
//        NOT FOUND AND UNAUTHORIZED PAGES
// ==================================================

Cypress.Commands.add('verifyNotFoundPage', () => {
  cy.get(selectors.errors.notFoundImg).shoud('exist').and('be.visible');
});

Cypress.Commands.add('verifyUnauthorizedAccessPage', () => {
  cy.get(selectors.errors.unauthorizedImg).shoud('exist').and('be.visible');
});

// =========================
//         MOCKS
// =========================

// Mock POST /employees
Cypress.Commands.add('createEmployeeMock', (employeeData) => {
  cy.intercept('POST', '/employees', (req) => {
    expect(req.headers.authorization).to.eq(`Bearer ${token}`)
    expect(req.body).to.include(employeeData)

    req.reply({
      statusCode: 201,
      body: { id: '987c36ed-681a-45b4-bdc4-7b442afc149b', ...employeeData }
    })
  }).as('mockCreateEmployee')
});

// Mock GET /employees
Cypress.Commands.add('getEmployees', (fixture) => {
  if (!fixture) {
    cy.intercept('GET', '/employees?*', { statusCode: 200, body: [] }).as('mockEmployees')
  } else {
    cy.fixture(fixture).then((employees) => {
      cy.intercept('GET', '/employees?*', (req) => {
        const search = (req.query.name || '').toLowerCase()
        const filtered = search
          ? employees.filter(e => e.name.toLowerCase().includes(search))
          : employees

        req.reply({ statusCode: 200, body: filtered })
      }).as('mockEmployees')
    })
  }
});

// Mock GET /employees/:id
Cypress.Commands.add('getEmployeeById', (employeeId, fixture = 'employees') => {
  cy.fixture(fixture).then((employees) => {
    const employee = employees.find(e => e.id === employeeId)

    cy.intercept({ method: 'GET', url: `/employees/${employeeId}` },
      { statusCode: 200, body: employee || {} }
    ).as('mockEmployeeById')
  })
});

// Mock DELETE /employees/:id
Cypress.Commands.add('deleteEmployeeById', (id, hasVacation = false) => {
  cy.intercept('DELETE', `/employees/${id}`, (req) => {
    expect(req.headers.authorization).to.eq(`Bearer ${token}`);

    req.reply(
      hasVacation
        ? { statusCode: 400, body: { message: 'Não é possível excluir este funcionário, pois há férias vinculadas à ele.' } }
        : { statusCode: 204, body: {} }
    )
  }).as('mockDeleteEmployee')
});

// Mock POST /users
Cypress.Commands.add('createUser', (user) => {
  cy.intercept('POST', `/users`, (req) => {
    expect(req.headers.authorization).to.eq(`Bearer ${token}`);
    expect(req.body).to.include(user)

    req.reply({
      statusCode: 201,
      body: user
    });
  }).as('mockCreateUser')
});

// Mock GET /users/id
Cypress.Commands.add('getUser', (id, fixtureName = 'adminUserLocalStorage') => {
  cy.fixture(fixtureName).then((userData) => {
    cy.intercept(
      {
        method: 'GET',
        url: `/users/${id}`,
      },
      {
        statusCode: 200,
        body: userData
      }
    ).as('mockGetUser');
  });
});



// Mock login as any user fixture
Cypress.Commands.add('mockAthenticateAs', (userFixture) => {
  cy.fixture(userFixture).then((userInfo) => {
    cy.intercept('POST', '/sign-in', {
      statusCode: 200,
      body: userInfo
    }).as('mockSignInRequest')

    cy.window().its('localStorage').invoke('setItem', 'userInfo', JSON.stringify(userInfo))
  })
});

// Combine login + mock in one command
Cypress.Commands.add('loginAndMockWithEmployees', (employeeList = 'employees') => {
  cy.visit('/')
  cy.mockAthenticateAs('adminUserLocalStorage')
  cy.getEmployees(employeeList)

  cy.login(adminUser.username, adminUser.password)

  cy.wait('@mockSignInRequest')
  cy.wait('@mockEmployees')
});

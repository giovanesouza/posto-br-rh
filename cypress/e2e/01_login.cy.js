describe('Login', () => {
  beforeEach(() => {

    cy.intercept('POST', '/sign-in', {
    statusCode: 200,
    body: {
      token: 'fake-token',
      user: {
        id: 1,
        name: 'Giovane Souza',
        username: 'giovanesouza',
        isAdmin: true
      }
    }
  }).as('mockLogin');


  cy.intercept('GET', '/employees', (req) => {
  expect(req.headers.authorization).to.eq('Bearer fake-token')
    req.reply({
      statusCode: 200,
      body: [{name: "João Silva", position: "Analista"}, {name: "Maria Souza", position: "Gerente"}]
    });
  }).as('mockEmployees');

    // 👉 Simula token salvo no localStorage
  cy.window().then((win) => {
    win.localStorage.setItem('token', 'fake-token');
  });


    cy.visit('/')
  });

  it('1. Deve exibir campos de login', () => {
    cy.get('input[name=username]').should('be.visible')
    cy.get('input[name=password]').should('be.visible')
    cy.get('button[type=submit]').should('contain', 'Entrar')
  })

  it('2. Deve mostrar erro ao enviar campos vazios', () => {
    cy.get('button[type=submit]').click()
    cy.get('div').should('contain', 'Verifique se os campos foram preenchidos corretamente')
  })

  it('3. Dados inválidos: Deve exibir mensagem de erro', () => {
    cy.login('usuario_teste', '123456');
    cy.get('div').should('contain', 'Verifique se os campos foram preenchidos corretamente')
  });

  it('4. Usuário deve autenticar com credenciais válidas', () => {
    cy.login('giovanesouza', '123456');
    cy.wait('@mockLogin');
    // cy.wait('@mockEmployees');
    cy.url().should('include', '/app/funcionarios');
    // cy.get('h2').should('contain', 'Lista de Funcionários');
  });

//     it('deve autenticar com credenciais válidas', () => {
//     cy.visit('/')
//     cy.get('input[name=username]').type('usuario_teste')
//     cy.get('input[name=password]').type('123456')
//     cy.get('button[type=submit]').click()
//     cy.get('div').should('contain', 'Verifique se os campos foram preenchidos corretamente')
//   });
});

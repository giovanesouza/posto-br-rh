import { selectors } from '../support/selectors';

describe('Vacations', () => {
  beforeEach(() => {
    cy.loginAndMockWithEmployees();
  });

  it('1 Should access employee without registered vacations and verify elements', () => {
    cy.getEmployeeById('897c63ed-680a-44b5-bcd2-7b442afc149b');
    cy.selectVacationHistoryButton('Pedro Henrique Ferreira Silva');
    cy.wait('@mockEmployeeById');
    cy.get(selectors.vacationHistory.title).should('exist').and('be.visible');
    cy.get(selectors.buttons.vacationCreateBtn).should('exist').and('be.visible');
    cy.get(selectors.employeeList.emptyMessage).should('contain', 'Nenhuma férias cadastrada!');
  });

  it('2 Should access vacation registration page and verify all elements are visible', () => {
    cy.getEmployeeById('897c63ed-680a-44b5-bcd2-7b442afc149b');
    cy.selectVacationHistoryButton('Pedro Henrique Ferreira Silva');
    cy.wait('@mockEmployeeById');
    cy.get(selectors.buttons.vacationCreateBtn).first().click();
    cy.wait('@mockEmployeeById');
    cy.verifyVacationRegistrationPage();
  });

  it('3 Should access employee without registered vacations and try to add vacation without filling any field', () => {
    cy.getEmployeeById('897c63ed-680a-44b5-bcd2-7b442afc149b');
    cy.selectVacationHistoryButton('Pedro Henrique Ferreira Silva');
    cy.wait('@mockEmployeeById');
    cy.get(selectors.buttons.vacationCreateBtn).first().click();
    cy.wait('@mockEmployeeById');
    cy.submitForm();
    cy.verifyErrorToast('O campo data inicial é obrigatório!');
  });

  it('4 Should access employee with registered vacations and view vacation records with edit and delete buttons', () => {
    cy.getEmployeeById('987c63ed-670a-44b5-bcd2-7b452afc148b');
    cy.selectVacationHistoryButton('Maria Clara Souza Oliveira');
    cy.wait('@mockEmployeeById');
    cy.verifyTotalFilteredItemsAppearAsExpected(1);
    cy.get(selectors.buttons.vacationCreateBtn).should('exist').and('be.visible');
    cy.get(selectors.buttons.vacationEditBtn).should('exist').and('be.visible');
    cy.get(selectors.buttons.vacationDeleteBtn).should('exist').and('be.visible');
  });

});
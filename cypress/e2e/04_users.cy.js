import { selectors } from '../support/selectors';
import { employeeUserWithVacation, adminUser } from '../support/utils';

describe('Users', () => {
    beforeEach(() => {
        cy.loginAndMockWithEmployees();
    });

    it('1 Should verify that all elements on the user registration page are visible', () => {
        cy.accessMenu('Criar usuário');
        cy.verifyCreateUserPage();
    });

    it('2 Should attempt to register a user with empty fields', () => {
        cy.accessMenu('Criar usuário');
        cy.submitForm();
        cy.verifyErrorToast('Verifique se os campos foram preenchidos corretamente.');
    });

    it('3 Should attempt to register a user with only the username field filled', () => {
        cy.accessMenu('Criar usuário');
        cy.fillInput(selectors.createUser.usernameInput, employeeUserWithVacation.username);
        cy.submitForm();
        cy.scrollTo('top');
        cy.verifyErrorToast('Os campos senha, funcionário são obrigatórios!');
    });

    it('4 Should register a user with all fields filled', () => {
        const { username, password, isAdmin, name } = employeeUserWithVacation;
        cy.createUser({ username, password, isAdmin });
        cy.accessMenu('Criar usuário');
        cy.selectOption(selectors.createUser.employeeSelect, employeeUserWithVacation.name);
        cy.fillInput(selectors.createUser.usernameInput, employeeUserWithVacation.username);
        cy.submitForm();
        cy.wait('@mockCreateUser');
        cy.verifySuccessToast(`Usuário cadastrado com sucesso para o(a) funcionário(a): ${name}!`);
    });

    it('5 Should verify the logged-in user page', () => {
        cy.getUser('f9fce246-a363-4f00-bfd2-9aed6378d771')
        cy.get(selectors.toasts.closeBtn).click();
        cy.get(selectors.buttons.adminSettings).click();
        cy.wait('@mockGetUser');
        cy.verifyEditUserPage();
        cy.verifyInputValue(selectors.editUser.usernameInput, adminUser.username);
    });

});
export const selectors = {
  // ====== AUTH ======
  login: {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    submitBtn: 'button[type="submit"]'
  },

  // ====== INPUTS ======
  inputs: {
    allInputs: 'input',
    searchEmployeeName: 'input[name="searchEmployeeName"]',
    employeeName: 'input#employeeName',
    cpf: 'input#cpf',
    admissionDate: 'input#admissionDate'
  },

  // ====== BUTTONS ======
  buttons: {
    submit: 'button[type="submit"]',
    logout: 'button.logout',
    adminSettings: 'button.material-symbols-outlined[title="Configurações do Admin"]',

    // employee list actions
    viewBtn: 'button.bg-hover-blue.color-blue',
    editBtn: 'button.bg-hover-green.color-green',
    deleteBtn: 'button.bg-hover-danger.color-danger'
  },

  // ====== MENU ======
  menu: {
    sidebar: 'ul.menu-hidden',
    rightMenu: 'div.right-menu',
    listEmployees: 'a[href="/app/funcionarios"]',
    createEmployee: 'a[href="/app/cadastrar-funcionario"]',
    createUser: 'a[href="/app/cadastrar-usuario"]'
  },

  // ====== FOOTER ======
  footer: {
    address: 'footer address'
  },

  // ====== HEADERS ======
  headers: {
    pageTitle: 'h1'
  },

  // ====== EMPLOYEE LIST PAGE ======
  employeeList: {
    table: 'table',
    tableRows: 'table tbody tr',
    situationHasVacation: 'table .employee-situation.has-vacation',
    situationNoVacation: 'table .employee-situation.no-vacation',
    emptyMessage: 'table td'
  },

  // ====== TOASTS ======
  toasts: {
    success: '.Toastify__toast--success[role="alert"]',
    error: '.Toastify__toast--error[role="alert"]',
    closeBtn: 'button.Toastify__close-button'
  }
};

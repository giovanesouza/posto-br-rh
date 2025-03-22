export function isEmailValid(userEmail) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(userEmail.trim());
};

export function isPasswordValid(password) {
    const pattern = /^[\w|\W]{7,20}$/;
    return pattern.test(password.trim());
};

export function isCpfValid(cpf) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf.trim());
};

export function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length == 11) cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    return cpf.trim();
};

export function isNameValid(name) {
    const pattern = /^[A-Za-zÀ-ÿ]+\s[A-Za-zÀ-ÿ\s]+$/;
    return pattern.test(name.trim());
};

export function isUsernameValid(username) {
    const pattern = /^[A-Za-zÀ-ÿ]{12,20}$/;
    return pattern.test(username.trim());
};

export function isEmailValid(userEmail) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(userEmail.trim());
};

export function isPasswordValid(password) {
    const pattern = /^[\w|\W]{6,20}$/;
    return pattern.test(password);
};

export function isCpfValid(cpf) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
};

export function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return cpf;
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};


export function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let firstCheckDigit = 11 - (sum % 11);
    if (firstCheckDigit >= 10) firstCheckDigit = 0;
    if (firstCheckDigit !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    let secondCheckDigit = 11 - (sum % 11);
    if (secondCheckDigit >= 10) secondCheckDigit = 0;
    if (secondCheckDigit !== parseInt(cpf.charAt(10))) return false;

    return true;
}
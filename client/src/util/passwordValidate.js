function validatePassword(password) {
    const minLength = 8;
    return password.length >= minLength &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password);
}

export default validatePassword;
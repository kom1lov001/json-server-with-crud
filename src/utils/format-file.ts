export function validateEmail(email: string) {
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

export class EmailValidator {
    isValid(email: string): boolean {
        return /@/.test(email)
    }
}
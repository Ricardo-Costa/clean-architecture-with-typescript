import validator from "validator"

export class EmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email)
    }
}
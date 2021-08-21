import validator from "validator"

export default class EmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email)
    }
}
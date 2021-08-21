import ValidatorSpy from '../../../__mocks__/validators/validator.spy'
import EmailValidator from './email.validator'

const makeEmailValidator = () => {
    const validator = new ValidatorSpy()
    // moked class
    class EmailValidatorSpy extends EmailValidator {
        isValid(email: string): boolean {
            return validator.isEmail(email)
        }
    }
    return {
        sut: new EmailValidatorSpy(),
        validator
    }
}

describe('Email Validator', () => {

    test('Should return true if validator returns true', () => {
        const { sut } = makeEmailValidator()
        const isValidEmail = sut.isValid('valid_email@mail.com')
        expect(isValidEmail).toBe(true)
    })

    test('Should return false if validator returns false', () => {
        const { sut, validator } = makeEmailValidator()
        validator.isValidEmail = false
        const isValidEmail = sut.isValid('invalid_email@mail.com')
        expect(isValidEmail).toBe(false)
    })

})

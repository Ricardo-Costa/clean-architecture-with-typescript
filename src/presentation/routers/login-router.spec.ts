import UserRepository from "../../domain/repositories/user-repository"
import LoginRouter from "./login-router"
import { HttpResponseMetadata } from "../../infrastructure/types/http-response-metadata"
import AuthUseCase from "../../domain/usecases/auth-usecase"
import HttpResponse from "../../../src/presentation/utils/http-response-util"
import EmailValidator from "../validators/email.validator"
import HttpStatusCode from "../enums/http-status-code.enum"
import ValidatorSpy from "../../../__mocks__/validators/validator.spy"
import { EMAIL, PASSWORD } from "../../../__mocks__/user.sut"

const makeAuthUseCase = () => {
    // moked class
    class AuthUseCaseSpy extends AuthUseCase {
        email: string = ''
        password: string = ''
    
       async auth(email: string, password: string): Promise<HttpResponseMetadata> {
            this.email = email
            this.password = password
            const user = UserRepository.findOneByEmailAndPassword(email, password)
            if (user) {
                return HttpResponse.ok({
                    user,
                    accessToken: 'valid_access_token'
                })
            }
            return HttpResponse.notAuthorized()
        }
    }
    return new AuthUseCaseSpy()
}

const makeEmailValidator = () => {
    const validator = new ValidatorSpy()
    // moked class
    class EmailValidatorSpy extends EmailValidator {
        isValid(email: string): boolean {
            return validator.isEmail(email)
        }
    }
    return {
        emailValidator: new EmailValidatorSpy(),
        validator
    }
}

const makeSup = () => {
    const authUseCase = makeAuthUseCase()
    const { emailValidator, validator } = makeEmailValidator()
    const sut = new LoginRouter(authUseCase, emailValidator)
    return {
        sut,
        authUseCase,
        validator
    }
}

describe('Login Router', () => {

    test('Should return 400 if no email or password is provided.', async () => {
        const { sut } = makeSup()
        const httpRequest = {
            body: {
                email: '',
                password: ''
            }
        }
        const resp: HttpResponseMetadata = await sut.router(httpRequest)
        expect(resp.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
    })

    test('Should return 422 if no valid emai provided.', async () => {
        const { sut, validator } = makeSup()
        const httpRequest = {
            body: {
                email: 'invalid_email@mail.com',
                password: 'valid_password'
            }
        }
        validator.isValidEmail = false
        const resp: HttpResponseMetadata = await sut.router(httpRequest)
        expect(resp.statusCode).toBe(HttpStatusCode.UNPROCESSABLE_ENTITY)
    })

    test('Should return 401 when invalid credencials are provided.', async () => {
        const { sut } = makeSup()
        const httpRequest = {
            body: {
                email: EMAIL,
                password: 'invalid_password'
            }
        }
        const resp: HttpResponseMetadata = await sut.router(httpRequest)
        expect(resp.statusCode).toBe(HttpStatusCode.UNAUTHORIZED)
        // expect(resp.body).toEqual(new NotAuthorizedError(''))
        expect(resp.body).toBeInstanceOf(Error)
    })
    
    test('Should return 200, User and accessToken if valid login.', async () => {
        const { sut } = makeSup()
        const httpRequest = {
            body: {
                email: EMAIL,
                password: PASSWORD
            }
        }
        const resp: HttpResponseMetadata = await sut.router(httpRequest)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toHaveProperty('user')
        expect(resp.body).toHaveProperty('accessToken')
    })
    
    test('Should to call AuthUseCase with correct params.', () => {
        const { sut, authUseCase } = makeSup()
        const httpRequest = {
            body: {
                email: EMAIL,
                password: PASSWORD
            }
        }
        sut.router(httpRequest)
        expect(authUseCase.email).toBe(httpRequest.body.email)
        expect(authUseCase.password).toBe(httpRequest.body.password)
    })

})